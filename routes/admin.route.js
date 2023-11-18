const router = require('express').Router();
const multer = require('multer');
const { houseImages, adsImages } = require('../utils/multer_upload');
const adminController = require('../controllers/admin.controller');

router.post('/', houseImages, adminController.createHouse,);

router.get('/', adminController.getHouses);

router.get('/requested', adminController.getRequestedHouses);

router.get('/details', adminController.getHouseDetails);

router.get('/images', adminController.getHouseImages);

router.put('/images', adminController.getHouseImages);

router.put('', adminController.editHouse);

router.delete('', adminController.deleteHouse);

router.post('/ads', adsImages, adminController.addAdvertisment);

router.delete('/ads', adminController.removeAdvertisment);

module.exports = router;