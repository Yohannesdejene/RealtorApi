const { createLogger, format, transports } = require('winston');

const logConfig = {
    transports: [
        new transports.File({
            level: 'info',
            filename: 'logs/server.log',
            format: format.combine(
                format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss'
                }),
                format.align(),
                format.printf(info => `[${info.level.toUpperCase()}]: ${[info.timestamp]}: ${info.message}`),
            ),
        }),
        new transports.File({
            level: 'error',
            filename: 'logs/error.log',
            format: format.combine(
                format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss'
                }),
                format.align(),
                format.printf(info => `[${info.level.toUpperCase()}]: ${[info.timestamp]}: ${info.message}`),
            ),
        }),
    ],
};

exports.logger = createLogger(logConfig);

if (process.env.NODE_ENV !== 'production') {
    this.logger.add(new transports.Console({
        format: format.simple(),
    }));
}