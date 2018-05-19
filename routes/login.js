const express = require("express");
const router = express.Router();
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt-nodejs");
const api = require("../api.js");

passport.use(new strategy(
    function (username, password, done) {
        api.findByUsername(username, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
            let ismatch;
            bcrypt.compare(password, user.password, (err, res) => {
                if (res === true) {
                    ismatch = true;
                }
                else ismatch = false;
                if (!ismatch) { return done(null, false, { message: 'Incorrect password.' }); }
                return done(null, user);
            });
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
    api.findById(_id, function (err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
});

router.get('/signup', function (req, res) {
    res.render('body/signup');
});

router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), (req, res) => {
    res.redirect('/index');
});

router.get('/signin', (req, res) => {
    res.render('body/signin', { message: req.flash('error') });
});

router.get('/signup', (req, res) => {
    res.render('body/signup', {});
});

router.get('/signup_suc', (req, res) => {
    res.render('body/signup_suc', {});
});

router.get('/signup_err', (req, res) => {
    res.render('body/signup_err', {});
});

router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/signup', (req, res) => {
    if (req.body.password1 != req.body.password2) res.redirect('/signup_err');
    else {
        api.GetUserByUsername(req.body.username).then((user) => {
            if (user) res.redirect('/signup_err');
            else {
                api.CreateUser(req.body.username, req.body.password1);
                res.redirect('/signup_suc');
            }
        });
    }
});



module.exports = router;