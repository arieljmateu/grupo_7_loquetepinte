const User = require('../services/User');

// We set credentials in res.locals if user is logged in.
// So it can be access by EJS.
function userLoggedMiddleware(req, res, next) {
    if (req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;