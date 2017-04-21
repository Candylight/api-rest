module.exports = (server) => {
    const Challenge = server.models.Challenge;
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;

    return (req,res,next) => {
        Challenge.findById(req.params.id, (err, challenge) => {
            if (err)
                return res.status(500).send(err);
            let bots = challenge.bots;

            Bot.findById(bots[0], (err, bot1) => {
                if (err)
                    return res.status(500).send(err);

                Bot.findById(bots[1], (err, bot2) => {
                    if (err)
                        return res.status(500).send(err);

                    let bot1power = 0;
                    let bot2power = 0;

                    for(let weapon of bot1.weapons){
                        bot1power += parseInt(weapon.dommages);
                    }
                    for(let weapon of bot2.weapons){
                        bot2power += parseInt(weapon.dommages);
                    }

                    let winner = (bot1power/bot1.health) < (bot2power/bot2.health) ? bot2 : bot1 ;
                    challenge.winner.push(winner);

                    challenge.status = "Done";

                    challenge.save((err, instance) => {
                        if (err)
                            return res.status(500).send(err);

                        res.status(204).send();
                    })

                });
            });
        });
    }
};