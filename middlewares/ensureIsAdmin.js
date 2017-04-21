module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {

        User.findById(req.userId, (err, user) =>{
            if (!user.admin)
                return res.status(403).send();
            }
        );

        next();
    };
};