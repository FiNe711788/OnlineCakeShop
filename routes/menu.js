const express = require("express");
const router = express.Router();
const api = require("../api.js");

router.get('/index', (req, res) => {
    if (req.user) {
        api.GetOrderByName(req.user.username).then((order) => {
            if (order.length != 0) res.render('body/index', { order: order, login:true });
            else {
                res.render('body/index_null');
            }
        });
    }
    else res.redirect('/signin');
});

router.get('/orderId', (req, res) => {
    api.GetOrderById(req.query.ID).then((order) => {
        res.json(order);
    });
});

router.get('/cakes', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('body/cakes', { login: true });
    } else {
        res.render('body/cakes', { login: false });
    }
});

router.get('/contact', function (req, res) {

    if (req.isAuthenticated()) {
        res.render('body/contact', { login: true });
    } else {
        res.render('body/contact', { login: false });
    }
});

router.get('/flavours', function (req, res) {

    if (req.isAuthenticated()) {
        res.render('body/flavours', { login: true });
    } else {
        res.render('body/flavours', { login: false });
    }
});

router.get('/order', function (req, res) {

    if (req.isAuthenticated()) {
        res.render('body/order', { login: true });
    } else {
        res.render('body/order', { login: false });
    }
});

router.get('/range', function (req, res) {

    if (req.isAuthenticated()) {
        res.render('body/range', { login: true });
    } else {
        res.render('body/range', { login: false });
    }
});

router.get('/signaturecakes', async (req, res) => {
    const comments = await api.GetCommentByCakeName("My Signature Cakes");
    if (req.isAuthenticated()) {
        res.render('body/signaturecakes', {
            comments: comments, login: true
        });
    } else {
        res.render('body/signaturecakes', {
            comments: comments, login: false
        });
    }
});

router.get('/bdaycakes', async (req, res) => {
    const comments = await api.GetCommentByCakeName("Birthday Cakes");
    if (req.isAuthenticated()) {
        res.render('body/bdaycakes', {
            comments: comments, login: true
        });
    } else {
        res.render('body/bdaycakes', {
            comments: comments, login: false
        });
    }
});

router.get('/christeningcakes', async (req, res) => {
    const comments = await api.GetCommentByCakeName("Christening Cakes");
    if (req.isAuthenticated()) {
        res.render('body/christeningcakes', {
            comments: comments, login: true
        });
    } else {
        res.render('body/christeningcakes', {
            comments: comments, login: false
        });
    }
});

router.get('/icedcakes', async (req, res) => {
    const comments = await api.GetCommentByCakeName("Iced Cakes");
    if (req.isAuthenticated()) {
        res.render('body/icedcakes', {
            comments: comments, login: true
        });
    } else {
        res.render('body/icedcakes', {
            comments: comments, login: false
        });
    }
});

router.get('/kidscakes', async (req, res) => {
    const comments = await api.GetCommentByCakeName("Children Cakes");
    if (req.isAuthenticated()) {
        res.render('body/kidscakes', {
            comments: comments, login: true
        });
    } else {
        res.render('body/kidscakes', {
            comments: comments, login: false
        });
    }
});

module.exports = router;