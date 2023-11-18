const multer = require('multer');

houseFilesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static_assets/houses_images');

    },
    filename: (req, file, cb) => {
        var filename = file.originalname.split(" ").pop().split(".")[0];
        console.log(filename)
        cb(null, `${new Date().getTime().toString()}+realtorimage+${filename}.png`);
    }
});

adFilesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static_assets/ads_images');

    },
    filename: (req, file, cb) => {
        var filename = file.originalname.split(" ").pop().split(".")[0];
        cb(null, `${new Date().getTime().toString()}+realtorads+${filename}.png`);
    }
});

filteredFileTypes = (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file"));
    }
}

exports.houseImages = multer({
    storage: houseFilesStorage,
    fileFilter: filteredFileTypes,
    limits: { fieldSize: 15360000 }
}).fields([
    { name: 'images', maxCount: 10 },
    { name: 'coverImage', maxCount: 1 },
]);

exports.adsImages = multer({
    storage: adFilesStorage,
    fileFilter: filteredFileTypes,
    limits: { fieldSize: 15360000 }
}).array('ads', 5);