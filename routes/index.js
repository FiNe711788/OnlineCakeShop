const login = require(`./login`);
const menu = require(`./menu`);
const order = require(`./order`);
const comment = require(`./comment`)

const constructorMethod = app => {
    app.get('/', function (req, res) {
        if (req.isAuthenticated())
            res.redirect('index');
        else
            res.redirect('signin');
    });

    app.use(login);
    app.use(menu);
    app.use(order);
    app.use(comment);
};
module.exports = constructorMethod;