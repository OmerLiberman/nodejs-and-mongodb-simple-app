const express = require('express');
const app = express();

const request = require('request');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // needed for PUT and DELETE
const flash = require('connect-flash');
const expressSession = require('express-session');

dotenv.config({path: './config.env'});

// connecting to mongodb database.
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());

app.use(expressSession({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true
}));

app.use((req, resp, next) => {
    resp.locals.success_msg = req.flash(('success_msg'));
    resp.locals.error_msg = req.flash(('error_msg'));
    next();
})

const employeeRoutes = require('./routes/employees');
app.use(employeeRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is started')
})
