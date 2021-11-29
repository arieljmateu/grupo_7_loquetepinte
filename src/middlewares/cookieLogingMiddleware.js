const User = require('../services/User');


// If exists cookie with user's email then we automagically log them in
// (Remember me feature)
function cookieLogingMiddleware(req, res, next) {
    const emailInCookie = req.cookies.userEmail;
    if (emailInCookie) {
        User.findByEmail(emailInCookie)
            .then(userFromCookie => {
                if (userFromCookie) {
                    delete userFromCookie.password;
                    req.session.userLogged = userFromCookie;
                }

                next();
            })
            .catch(error => res.send(error));
    } else {
        next();
    }
}

module.exports = cookieLogingMiddleware;