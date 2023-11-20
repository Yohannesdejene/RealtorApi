const router = require("express").Router();

const unAuthHouseController = require("../controllers/unAuthHouse.controller");

router.get("/", unAuthHouseController.getHouses);

router.get("/detail", unAuthHouseController.getHouseDetails);

router.get("/images", unAuthHouseController.getHouseImages);

router.get("/search", unAuthHouseController.search);

router.get("/filter", unAuthHouseController.filteredHouses);

router.get(
  "/filterrealestate",
  unAuthHouseController.filteredHousesByRealestates
);

module.exports = router;
