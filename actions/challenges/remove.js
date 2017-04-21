module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        Challenge.findByIdAndRemove(req.params.id, (err, challenge) => {
            if (err)
                return res.status(500).send(err);

            res.status(204).send();
        })
    }
};
