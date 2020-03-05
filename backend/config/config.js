const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB: process.env.MONGO_URL,
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};