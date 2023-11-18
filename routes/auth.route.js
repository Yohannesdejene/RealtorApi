const router = require('express').Router();

const { verifyToken } = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.delete('/deactivate', authController.deactivateAccount);

module.exports = router;