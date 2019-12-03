require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const configs = {
    base: {
        env,
        appHost: process.env.APP_HOST || '127.0.0.1',
        appName: process.env.APP_NAME,
        port: process.env.PORT || 4000,
        dbUri: process.env.DB_URI,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
    },
    production: {},
    development: {},
    test: {
        port: 4001,
    },
};

const config = Object.assign(configs.base, configs[env]);

export default config;
