const router = require('express').Router();

const { verifyToken } = require('../middlewares/auth.middleware');

const houseController = require('../controllers/houses.controller');
const { route } = require('./auth.route');

router.get('/', houseController.getHouses);

router.get('/detail', houseController.getHouseDetails);

router.get('/images', houseController.getHouseImages);

router.post('/saved', houseController.saveHouse);

router.get('/saved', houseController.getSavedHouses);

router.delete('/saved', houseController.removeSavedHouse);

router.get('/search', houseController.search);

router.get('/filter', houseController.filteredHouses);

router.get('/request', houseController.requestProperty);

module.exports = router;