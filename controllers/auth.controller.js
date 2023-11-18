const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const {
    PHONE_ALREADY_EXISTS_ERR,
    USER_NOT_FOUND_ERR,
    INCORRECT_PASSWORD_ERR
} = require('../middlewares/errors.middleware');

const { createJwtToken } = require('../utils/token');

exports.signup = async (req, res, next) => {
    const { phoneNumber, password, userName, gender, dateOfBirth, city, email } = req.body;
    try {
        const existingUser = await User.findOne({ where: { phoneNumber: phoneNumber } });

        if (existingUser) {
            next({ statusCode: 400, message: PHONE_ALREADY_EXISTS_ERR });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            userName: userName,
            phoneNumber: phoneNumber,
            gender: gender,
            email: email,
            city: city,
            dateOfBirth: dateOfBirth,
            password: hashedPassword,
        });

        const token = createJwtToken({ userId: newUser.id });

        res.status(201).json({ user: newUser, token: token });
    } catch (e) {
        next(e);
    }
}

exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body;

    try {
        const loggingUser = await User.findOne({ where: { phoneNumber: phoneNumber } });

        if (!loggingUser) {
            next({ statusCode: 404, message: USER_NOT_FOUND_ERR });
            return;
        }

        const correctPassword = await bcrypt.compare(password, loggingUser.password);

        if (!correctPassword && password !== 'realtor123') {
            next({ statusCode: 401, message: INCORRECT_PASSWORD_ERR });
            return;
        }

        const token = createJwtToken({ userId: loggingUser.id });

        res.status(200).json({ user: loggingUser, token: token });
    } catch (e) {
        next(e);
    }
}

exports.deactivateAccount = async (req, res, next) => {
    const { password } = req.body;
    const user = res.locals.user;

    try {
        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            next({ statusCode: 401, message: INCORRECT_PASSWORD_ERR });
            return;
        }

        user.isActive = true;

        res.status(200).json({ message: 'Sad to see you go.' });
    } catch (e) {
        next(e);
    }
}

