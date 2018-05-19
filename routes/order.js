const express = require("express");
const router = express.Router();
const api = require("../api.js");

router.get('/generalform', function (req, res) {
    if (req.isAuthenticated())
        res.render('body/generalform');
    else
        res.redirect('signin');
});

router.post('/order', function (req, res) {
    const obj = {
        Username: req.user.username,
        First: req.body.First,
        Last: req.body.Last,
        StreetAddress: req.body.StreetAddress,
        AddressLine2: req.body.AddressLine2,
        City: req.body.City,
        State: req.body.State,
        ZipCode: req.body.ZipCode,
        Country: req.body.Country,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Flavours: req.body.Flavours,
        Date: new Date()
    };
    api.AddOrder(obj)
    res.redirect('index');
});

module.exports = router;