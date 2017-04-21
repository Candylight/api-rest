module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.findById(req.params.id)
            .populate({
                path: 'weapons'
            })
            .then(ensureOne)
            .then(filterWeapons)
            .then(returnResult)
            .catch(res.error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function filterWeapons(data) {
          return data.weapons;
        }

        function returnResult(data) {
          return res.status(200).send(data);
        }
    }
};
