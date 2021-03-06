module.exports = {
    isAdmin: (req, res, next) => {
        if (req.session.userLogged && req.session.userLogged.role_id == 1) {
            next();
        } else {
            res.redirect('/users/login');
        }
    },
    isGuest: (req, res, next) => {
        if (req.session.userLogged) {
            res.redirect('/users/profile');
        } else {
            next();
        }
    },
    isUser: (req, res, next) => {
        if (!req.session.userLogged) {
            res.redirect('/users/login');
        } else {
            next();
        }
    }
};