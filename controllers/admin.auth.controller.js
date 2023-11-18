const bcrypt = require('bcryptjs');
const { createJwtToken } = require("../utils/token");
const { PHONE_ALREADY_EXISTS_ERR } = require("../middlewares/errors.middleware");
const Admin = require("../models/admin.model");

exports.createAdmin = async (req, res, next) => {
    const { phoneNumber, userName, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ where: { phoneNumber: phoneNumber } });

        if (existingAdmin) {
            next({ statusCode: 400, message: PHONE_ALREADY_EXISTS_ERR });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = await Admin.create({
            userName: userName,
            phoneNumber: phoneNumber,
            password: hashedPassword,
        });

        const token = createJwtToken({ userId: newAdmin.id });

        res.status(201).json({ admin: newAdmin, token: token });
    } catch (e) {
        next(e);
    }
}

exports.loginAdmin = async (req, res, next) => {
    const { phoneNumber, password } = req.body;

    try {
        const loggingAdmin = await Admin.findOne({ where: { phoneNumber: phoneNumber } });

        if (!loggingAdmin) {
            next({ statusCode: 404, message: USER_NOT_FOUND_ERR });
            return;
        }

        const correctPassword = await bcrypt.compare(password, loggingAdmin.password);

        if (!correctPassword) {
            next({ statusCode: 401, message: INCORRECT_PASSWORD_ERR });
            return;
        }

        const token = createJwtToken({ userId: loggingAdmin.id });

        res.status(200).json({ admin: loggingAdmin, token: token });
    } catch (e) {
        next(e);
    }

}

exports.getAdmins = async (req, res, next) => {
    try {

    } catch (e) {
        next(e);
    }

}

exports.editAdmin = async (req, res, next) => {

}

exports.removeAdmin = async (req, res, next) => {

}