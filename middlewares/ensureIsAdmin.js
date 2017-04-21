module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        console.log(req.admin);
        if (!req.admin)
            return res.status(403).send();
        next();
    };
};