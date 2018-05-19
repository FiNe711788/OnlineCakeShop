const express = require("express");
const exphbs = require('express-handlebars');
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require('body-parser');
const api = require("./api.js");
const uuidV1 = require('uuid/v1');
const configRoutes = require("./routes");
let app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + ''));
app.engine('handlebars', exphbs({ defaultLayout: 'home' }, { partialsDir: ["views/partials/"] }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});