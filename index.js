require('dotenv').config();

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const urlencodedParser = express.urlencoded({ extended: true });

const app = express();
mongoose.connect(`${process.env.DATABASECONNECTION}`);

app.set(PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(session({
	secret: "asdkjlkj-herF19al!2L2)lex",
	resave: false,
	saveUninitialized: false
}));*/


app.use("/", require('./routes/web'));
app.use("/api", require('./routes/api'));


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
