const router = require('express').Router();

const adminController = require('../controllers/admin.auth.controller');

router.post('/create', adminController.createAdmin);

router.post('/login', adminController.loginAdmin);

router.get(adminController.getAdmins);

router.put(adminController.editAdmin);

router.delete(adminController.removeAdmin);

module.exports = router;