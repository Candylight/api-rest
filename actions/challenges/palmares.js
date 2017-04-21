module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        let challenges;

        Challenge.find({
            winner: req.params.id
        }, (err, instances) => {
            if(err)
                res.status(500).send(err);

            res.send(instances);
        });
    };
};
