const { logger } = require("../configs/logger");

exports.errorHandler = ((error, _, res, __) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Server error.';
    logger.log({ message: message, level: 'error' });
    res.status(status).json({ error: { message: message, code: status } });
});

exports.endpointNotFoundError = async (req, res, next) => {
    next({ statusCode: 404, message: req.url + ' NOT_FOUND' });
}

exports.API_ENDPOINT_NOT_FOUND_ERR = "Api endpoint not found";

exports.SERVER_ERR = "Something went wrong";

exports.AUTH_HEADER_MISSING_ERR = "Auth header is missing";

exports.AUTH_TOKEN_MISSING_ERR = "Missing token";

exports.JWT_DECODE_ERR = "Invalid token";

exports.INVALID_ACCOUNT_ERR = "Invalid account";

exports.USER_NOT_FOUND_ERR = "User not found";

exports.HOUSE_NOT_FOUND_ERR = "User not found";

exports.ACCESS_DENIED_ERR = "Access denied";

exports.ACCOUNT_ALREADY_EXISTS_ERR = "Account already exists";

exports.PHONE_ALREADY_EXISTS_ERR = "Phone number already exists";

exports.EMAIL_ALREADY_EXISTS_ERR = "Email already exists";

exports.EMAIL_NOT_FOUND_ERR = "Email not found";

exports.PHONE_NOT_FOUND_ERR = "Phone number not found";

exports.ACCOUNT_NOT_FOUND_ERR = "Account not found";

exports.IMAGE_UPLOAD_FAILED_ERR = "Image upload failed";

exports.IMAGE_DELETING_FAILED_ERR = "Image deleting failed";

exports.REQUEST_FAILED = "Request faileds";

exports.INCORRECT_PASSWORD_ERR = "Wrong password";

exports.HOUSE_IMAGES_ARE_REQUIRED_ERR = "House images of >4 are required";