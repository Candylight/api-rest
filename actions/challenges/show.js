module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        let query = Challenge.findById(req.params.id).populate({
            path: 'bots',
            populate: {
                path: 'weapons'
            },
            path: 'winner'
        });

        query.exec((err,instance) => {
            if (err)
                return res.status(500).send(err);

            if (!instance)
                return res.status(404).send();

            res.send(instance);
        });
    }
};
