const express = require("express");
const router = express.Router();
const api = require("../api.js");
const xss = require("xss");

router.post("/comment", function (req, res) {
    let username = req.user.username;
    let cakename = req.body.cakename;
    let newcomment = req.body.newcomment;
    api.CreateComment(username, cakename, newcomment);
    res.render("partials/comment", { layout: null, username: username, content: newcomment });
});

module.exports = router;