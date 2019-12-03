import winston, { format, transports } from 'winston';
import timestampColorize from 'winston-timestamp-colorize';
import config from 'config';

const { appName } = config;

const commonFormat = format.combine(
    format(info => ({ ...info, level: info.level.toUpperCase() }))(),
    format.label({ label: appName }),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
);

const consoleFormat = format.combine(
    timestampColorize({ color: 'yellow' }),
    format.colorize({
        all: true,
        colors: { info: 'blue', error: 'red', debug: 'yellow' },
    }),
    format.printf(({ timestamp, label, level, message }) => {
        return `${timestamp} ${label} [${level}] - ${message}`;
    }),
);

const logger = winston.createLogger({
    level: 'debug',
    transports: [new transports.Console()],
    format: format.combine(commonFormat, consoleFormat),
});

export default logger;
