const express = require('express');
const path = require('path');
const createError = require('http-errors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const CONFIG = require('./config/config');

const routes = require('./routes/routes');
const userRoutes = require('./routes/UserRoutes');
const billRoutes = require('./routes/BillRoutes');

const host = CONFIG.APP_HOST;
const port = CONFIG.APP_PORT;

const app = express();

mongoose.connect(CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/',routes);
app.use('/users', userRoutes);
app.use('',billRoutes);

app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
})
app.listen(port, host, () => {
    // const db = new dbCtrl.DBController();
    console.log(`Example app listening on port ${host}:${port}`)
})