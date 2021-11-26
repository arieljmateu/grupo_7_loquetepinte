// middleware to handle promise errors in controllers

module.exports = (err, req, res, next) => {
    res.status(err.status || 500);

    if (process.env.NODE_ENV !== 'production') {
        res.send(err);
    } else {
        res.send("Internal server error :(");
    }
};