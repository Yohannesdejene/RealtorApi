const bcrypt = require('bcryptjs');
const { createJwtToken } = require('../utils/token');
const { INCORRECT_PASSWORD_ERR } = require('../middlewares/errors.middleware');

exports.updateUser = async (req, res, next) => {
    const { userName, gender, dateOfBirth, city, email } = req.body;
    const user = res.locals.user;
    try {

        user.userName = userName;
        user.gender = gender;
        user.dateOfBirth = dateOfBirth;
        user.city = city;
        user.email = email;

        await user.save();

        res.status(200).json({ message: "User updated" });

    } catch (e) {
        next(e);
    }
}

exports.changePhoneNumber = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const user = res.locals.user;
    try {

        console.log(phoneNumber);
        console.log(password);

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            next({ statusCode: 401, message: INCORRECT_PASSWORD_ERR });
            return;
        }

        user.phoneNumber = phoneNumber;

        await user.save();

        res.status(200).json({ message: "Phone number updated" });
    } catch (e) {
        next(e);
    }
}

exports.changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = res.locals.user;

    try {
        const correctPassword = await bcrypt.compare(oldPassword, user.password);

        if (!correctPassword) {
            next({ statusCode: 401, message: INCORRECT_PASSWORD_ERR });
            return;
        }

        const hashedNewPw = await bcrypt.hash(newPassword, 12);

        user.password = hashedNewPw;

        await user.save();

        return res.status(201).json({ message: "Password updated" });
    } catch (e) {
        next(e);
    }
}

exports.addNotificationToken = async (req, res, next) => {
    const { notificationToken } = req.body;
    const user = res.locals.user;
    try {
        user.notificationToken = notificationToken;
        await user.save();

        res.status(200);
    } catch (e) {
        next(e);
    }
}

exports.getCurrentUser = async (req, res, next) => {
    const user = res.locals.user;
    try {
        const token = createJwtToken({ userId: user.id });

        res.status(200).json({ user: user, token: token });
    } catch (e) {
        next(e);
    }
}