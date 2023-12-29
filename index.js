require("dotenv").config();
// require('./configs/database').connect();
// const bodyParser = require("body-parser");

const cors = require("cors");
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const { logger } = require("./configs/logger");
const sequelize = require("./configs/database");
// const initializeFCM = require('./configs/notification');
const {
  verifyToken,
  verifyAdminToken,
} = require("./middlewares/auth.middleware");
const {
  errorHandler,
  endpointNotFoundError,
} = require("./middlewares/errors.middleware");
const { getUnauthHouses } = require("./controllers/houses.controller");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Models
const User = require("./models/user.model");
const House = require("./models/house.model");
const Admin = require("./models/admin.model");
const AdImage = require("./models/ad_image_url.model");
const SavedHouse = require("./models/saved_homes.model");
const HouseImageUrl = require("./models/house_image_url.model");

///cors middleware
app.use(
  cors({
    origin: [
      "https://realtoreth.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],

    credentials: true,
  })
);

// app.use(bodyParser.json());

// // Parse URL-encoded bodies for form submissions
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const houseRoutes = require("./routes/houses.route");
//add unauth house
const unAuthHouse = require("./routes/unAuthHouses.route");

const adminRoutes = require("./routes/admin.route");
const adminAuthRoutes = require("./routes/admin.auth.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/realtor", express.static(__dirname + "/static_assets"));
// app.use('/realtor/static_assets/houses_images', express.static(__dirname + '/static_assets/houses_images'));
// app.use('/static_assets/ads_images', express.static('ads_images'));

HouseImageUrl.belongsTo(House, { constraints: true, onDelete: "CASCADE" });
SavedHouse.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
SavedHouse.belongsTo(House, { constraints: true, onDelete: "CASCADE" });
User.hasMany(SavedHouse, { constraints: true, onDelete: "CASCADE" });
House.belongsTo(Admin, { constraints: true, onDelete: "CASCADE" });
House.hasMany(HouseImageUrl, { constraints: true, onDelete: "CASCADE" });
Admin.hasMany(AdImage, { constraints: true, onDelete: "CASCADE" });
AdImage.belongsTo(Admin, { constraints: true, onDelete: "CASCADE" });

app.use("/realtor/welcome", (req, res) => {
  res.status(200).json({
    message:
      "Welcome! This is Realtor. Find your home next home straight from your phone, restarted",
  });
});

app.get("/realtor/unauth/houses", getUnauthHouses);

app.use("/realtor/auth", authRoutes);
app.use("/realtor/admin/auth", adminAuthRoutes);
app.use("/realtor/admin/house", verifyAdminToken, adminRoutes);
app.use("/realtor/house", verifyToken, houseRoutes);
///add unauth route
app.use("/realtor/unauth/house", unAuthHouse);

app.use("/realtor/user", verifyToken, userRoutes);

app.post("/enterImage", async (req, res) => {
  try {
    const records = [
      {
        imageUrl: "/houses_images/1702831441263+realtorimage+p2",
        houseId: 55,
      },
      {
        imageUrl: "/houses_images/1702831441125+realtorimage+p1",
        houseId: 55,
      },
      {
        imageUrl: "/houses_images/1702831441117+realtorimage+p2",
        houseId: 55,
      },
      {
        imageUrl: "/houses_images/1702831440663+realtorimage+p3",
        houseId: 55,
      },

      {
        imageUrl: "/houses_images/1702831439874+realtorimage+p4",
        houseId: 55,
      },
      // {
      //   imageUrl: "/houses_images/1702531706549+realtorimage+jjj5",
      //   houseId: 51,
      // },
      // {
      //   imageUrl: "/houses_images/1702530725875+realtorimage+on11",
      //   houseId: 49,
      // },
      // {
      //   imageUrl: "/houses_images/1702500643278+realtorimage+1221",
      //   houseId: 46,
      // },
      // {
      //   imageUrl: "/houses_images/1702500159719+realtorimage+21w",
      //   houseId: 45,
      // },
      // {
      //   imageUrl: "/houses_images/1702500159495+realtorimage+e22",
      //   houseId: 45,
      // },
    ];
    await HouseImageUrl.bulkCreate(records);
    res.status(201).json({ message: "Bulk create complete", records });
  } catch (error) {
    res.status(500).json({ message: "Error creating bulk records", error });
  }
});

app.get("/getImages", async (req, res) => {
  const homes = await HouseImageUrl.findAll({
    where: { houseId: 12 },
  });
  res.status(201).json({ homes });
});
app.get("/", (req, res) => {
  res.send("sending....");
});

app.use("*", endpointNotFoundError);

app.use(errorHandler);

// sequelize
//   .sync({ alter: true })
//   .then((_) => {
//     console.log("sysnked");
//   })
//   .catch((e) => {
//     console.error("erre", e);
//   });
app.listen(port, () => {
  logger.log({ message: `Server running on porrt ${port}`, level: "info" });
});
