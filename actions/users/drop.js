module.exports = (server) => {
    const User = server.models.User;
    const Bot = server.models.Bot;

    return (req, res, next) => {

        User.findById(req.params.id, (err, user) => {
            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.status(404).send();

            Bot.findById(req.params.botId, (err, bot) => {
                if (err)
                    return res.status(500).send(err);

                if (!bot)
                    return res.status(404).send();


                let found = user.bots.some((bot) => {
                    return bot == req.params.botId
                });

                if (!found)
                    return res.status(403).send();

                user.bots.remove(req.params.botId);

                bot.user = undefined;

                user.save((err, data) => {
                    if (err)
                        return res.status(500).send(err);

                    bot.save((err, data) => {
                        if (err)
                            return res.status(500).send(err);

                        res.status(204).send();
                    });
                });
            });
        });
    };
};
