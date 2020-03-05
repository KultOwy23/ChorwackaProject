module.exports = {
    DB: process.env.MONGO_URL ? process.env.MONGO_URL: 'mongodb://localhost:27017/rentbills',
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 3000,
    APP_HOST: process.env.APP_HOST ? process.env.APP_HOST : '127.0.0.1',
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS ? process.env.EMAIL_ADDRESS : null,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD : null

};