const User = require('../models/user.model');

const Admin = require('../models/admin.model');

const { verifyJwtToken } = require('../utils/token');

const {
    AUTH_HEADER_MISSING_ERR,
    AUTH_TOKEN_MISSING_ERR,
    JWT_DECODE_ERR,
    USER_NOT_FOUND_ERR,
} = require('./errors.middleware');
const { head } = require('../routes/auth.route');

exports.verifyToken = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            next({ statusCode: 403, message: AUTH_HEADER_MISSING_ERR });
            return;
        }

        const token = header.split(" ")[1];

        if (!token) {
            next({ statusCode: 403, message: AUTH_TOKEN_MISSING_ERR });
            return;
        }

        const userId = await verifyJwtToken(token, next);

        if (!userId) {
            next({ statusCode: 403, message: JWT_DECODE_ERR });
            return;
        }

        const user = await User.findByPk(userId);

        if (!user) {
            next({ statusCode: 403, message: USER_NOT_FOUND_ERR });
            return;
        }

        res.locals.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

exports.verifyAdminToken = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            next({ statusCode: 403, message: AUTH_HEADER_MISSING_ERR });
            return;
        }

        const token = header.split(" ")[1];

        if (!token) {
            next({ statusCode: 403, message: AUTH_TOKEN_MISSING_ERR });
            return;
        }

        const userId = await verifyJwtToken(token, next);

        if (!userId) {
            next({ statusCode: 403, message: JWT_DECODE_ERR });
            return;
        }

        const admin = await Admin.findByPk(userId);

        if (!admin) {
            next({ statusCode: 403, message: USER_NOT_FOUND_ERR });
            return;
        }

        res.locals.admin = admin;
        next();
    } catch (e) {
        next(e);
    }
}