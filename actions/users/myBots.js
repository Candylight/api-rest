module.exports = (server) => {
    const User = server.models.User;
    const Bot = server.models.Bot;

    return (req, res, next) => {
        User.findById(req.params.id)
            .then(ensureOne)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function respond(data) {
            return res.status(200).send(data.bots)
        }

        function error(reason) {
            if (!reason.code)
                return res.status(500).send(reason);

            return res.status(reason.code).send(reason.message);
        }
    }
};
