module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        if (User.admin != 1)
            return res.status(403).send()
        next()
    };
};