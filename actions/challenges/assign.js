module.exports = (server) => {
    const Bot = server.models.Bot;
    const Challenge = server.models.Challenge;

    //bots/:id/assign/:weaponId
    return (req, res, next) => {

        Bot.findById(req.params.botId, (err, bot) => {
            if (err)
                return res.status(500).send(err);

            if (!bot)
                return res.status(404).send();

            Challenge.findById(req.params.id, (err, challenge) => {
                if (err)
                    return res.status(500).send(err);

                if (!challenge)
                    return res.status(404).send();

                if(challenge.status != "Selecting")
                    return res.status(403).send();

                // Maximum bot = 2
                if (challenge.bots.length == 2)
                    return res.status(403).send();

                // Test if user already has robot in challenge
                if (challenge.bots.length == 1 && challenge.bots[0].owner._id == req.userId){
                    return res.status(403).send();
                }

                challenge.bots.push(bot._id);

                challenge.save((err, instance) => {
                    if (err)
                        return res.status(500).send(err);
                    res.status(204).send();
                });
            })
        })
    };
};