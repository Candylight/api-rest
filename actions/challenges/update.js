module.exports = (server) => {
    const Challenge = server.models.Challenge;


    return (req, res, next) => {

        Challenge.findById(req.params.id)
            .then(ensureOne)
            .then(update)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function update(challenge) {
            return Challenge.update({_id: challenge._id}, req.body)
        }

        function respond() {
            res.status(204).send()
        }

        function error(reason) {
            if (reason.code)
                return res.status(reason.code).send(reason.message);

            return res.status(500).send(reason);
        }

    }
};
