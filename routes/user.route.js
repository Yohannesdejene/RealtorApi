const router = require('express').Router();

const { verifyToken } = require('../middlewares/auth.middleware');

const userController = require('../controllers/user.controller');

router.get('/', userController.getCurrentUser);

router.put('/', userController.updateUser);

router.put('/phone', userController.changePhoneNumber);

router.post('/notification', userController.addNotificationToken);

router.put('/reset', userController.changePassword);

module.exports = router;