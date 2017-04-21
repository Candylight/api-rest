module.exports = (server) => {
    const User = server.models.User;
    const Bot = server.models.Bot;

    //bots/:id/assign/:weaponId
    return (req, res, next) => {

        Bot.findById(req.params.botId, (err, bot) => {
            if (err)
                return res.status(500).send(err);

            if (!bot)
                return res.status(404).send();

            if (bot.owner)
                return res.status(403).send();

            User.findById(req.params.id, (err, user) => {
                if (err)
                    return res.status(500).send(err);

                if (!user)
                    return res.status(404).send();

                bot.user = user._id;

                user.bots.push(bot._id);

                bot.save((err, instance) => {
                    if (err)
                        return res.status(500).send(err);

                    user.save((err, instance) => {
                        if (err)
                            return res.status(500).send(err);

                        res.status(204).send();
                    })
                })
            })
        })
    };
};
