require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const configs = {
    base: {
        env,
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
