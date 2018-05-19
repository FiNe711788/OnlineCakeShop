const mongoCollections = require("./config/mongoCollections");
const usercol = mongoCollections.col_user;
const ordercol = mongoCollections.col_order;
const commentcol = mongoCollections.col_comment;
const uuidV1 = require('uuid/v1');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongodb').ObjectID


const exportedMethods = {
    async findByUsername (username, done) {
        const col_user = await usercol();
        const user = await col_user.findOne({ username: username });
        if(user) {
            return done(null, user);
        } else {
            return done(null, null);
        }
        // return col_user.findOne({ username: username }).then((user) => {
        //     if (user) return done(null, user);
        //     else return done(null, null);
        // });
    },

    async findById (_id, done) {
        const col_user = await usercol();
        const user = await col_user.findOne({ _id: _id });
        if(user) {
            return done(null, user);
        } else {
            return done(new Error('User ' + _id + ' does not exist'));
        }
        // return col_user.findOne({ _id: _id }).then((user) => {
        //     if (user) return done(null, user);
        //     else return done(new Error('User ' + _id + ' does not exist'));
        // });
    },

    async GetUserByUsername (username) {
        const col_user = await usercol();
        const user = await col_user.findOne({ username: username });
        if(user) {
            return user;
        }
        // return col_user.findOne({ username: username }).then((user) => {
        //     return user;
        // });
    },

    async CreateUser (username, password) {
        const col_user = await usercol();
        let hash = bcrypt.hashSync(password);
        let user = {
            _id: uuidV1(),
            username: username,
            password: hash
        };
        return await col_user.insertOne(user);
    },

    async GetOrderById (id) {
        const col_order = await ordercol();
        return await col_order.findOne({ _id: new ObjectID(id) })
    },

    async GetOrderByName (name) {
        const col_order = await ordercol();
        const order = await col_order.find({ Username: name });
        if(order) {
            return order.toArray();
        }
        // return col_order.find({ Username: name }).toArray().then((order) => {
        //     return order;
        // });
    },

    async AddOrder (order) {
        const col_order = await ordercol();
        return await col_order.insertOne(order);
    },

    async CreateComment (username, cakename, comment) {
        const col_comment = await commentcol();
        let newcomment = {
            cakename: cakename,
            username: username,
            content: comment
        };
        return await col_comment.insertOne(newcomment);
    },

    async GetCommentByCakeName (cakename) {
        const col_comment = await commentcol();
        const comments = await col_comment.find({ cakename: cakename });
        if(comments) {
            return comments.toArray();
        }
        // return col_order.find({ Username: name }).toArray().then((order) => {
        //     return order;
        // });
    },

    
}
module.exports = exportedMethods;
