module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.findById(req.params.id)
            .populate({
                path: 'bots',
                populate: {
                    path: 'weapons'
                }
            })
            .then(ensureOne)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function respond(data) {
          console.log(data)
            return res.status(200).send(data)
        }

        function error(reason) {
            if (!reason.code)
                return res.status(500).send(reason);

            return res.status(reason.code).send(reason.message);
        }
    }
};
