module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {

        User.findById(req.params.id, (err, user) =>{
            if (user._id != req.userId)
                return res.status(403).send();

      next();
        });
    };
};
