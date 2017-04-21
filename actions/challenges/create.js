module.exports = (server) => {
    const Challenge = server.models.Challenge;
    const User = server.models.User;
    const Bot = server.models.Bot;

    //les deux Users disposent de Bot,
    //les deux Users n'ont pas déjà fait de Challenge aujourd'hui,
    //    que ces Bots sont équipés d'aux moins une Weapon,

    return (req, res) => {

        let source;
        let target;

        User.findById(req.body.source)
            .then(ensureSource)
            .then(getTarget)
            .then(ensureTarget)
            .then(ensureUsersHaveBots)
            .then(getTodaySourceChallenges)
            .then(ensureSourceChallenges)
            .then(getTodayTargetChallenges)
            .then(ensureTargetChallenges)
            .then(getBotsSource)
            .then(ensureBotsSourceHaveWeapons)
            .then(getBotsTarget)
            .then(ensureBotsTargetHaveWeapons)
            .then(saveChallenge)
            .then(res.noContent)
            .catch(res.error);

        function ensureSource(rSource) {
            return rSource ? source = rSource : Promise.reject({error: 404});
        }

        function getTarget() {
            return User.findById(req.body.target);
        }

        function ensureTarget(rTarget) {
            return rTarget ? target = rTarget : Promise.reject({error: 404});
        }

        function ensureUsersHaveBots(){
            if(source.bots.length == 0)
                return Promise.reject({error: 403});

            if(target.bots.length == 0)
                return Promise.reject({error: 403});
        }

        function getTodaySourceChallenges(){
            let today = new Date();
            return Challenge.find({
                date: {
                    $gte: new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0,0)
                },
                $or: [
                    {"source": target._id}, {"source" : source._id}
                ],
                status: {
                    $in: ['Pending', 'Selecting', 'Done']
                }
            });
        }

        function ensureSourceChallenges(challenges){
            if(challenges.length > 0)
                return Promise.reject({error: 403});
        }

        function getTodayTargetChallenges() {
            let today = new Date();
            return Challenge.find({
                date: {
                    $gte: new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0,0)
                },
                $or : [
                    {"target" : target._id}, {"target": source._id}
                ],
                status: {
                    $in: ['Selecting', 'Done']
                }
            });
        }

        function ensureTargetChallenges(challenges){
            if(challenges.length > 0)
                return Promise.reject({error: 403});
        }

        function getBotsSource() {
            return Bot.find({
                owner: source._id.toString()
            });
        }

        function ensureBotsSourceHaveWeapons(bots){
            console.log(bots);
            let fBot;
            for(let bot of bots)
            {
                if(bot.weapons.length > 0)
                    fBot = bot;
            }

            if(!fBot)
                return Promise.reject({error: 403});
        }

        function getBotsTarget() {
            return Bot.find({
                owner: target._id
            });
        }

        function ensureBotsTargetHaveWeapons(bots){
            let fBot;
            for(let bot of bots)
            {
                if(bot.weapons.length > 0)
                    fBot = bot;
            }

            if(!fBot)
                return Promise.reject({error: 403});
        }

        function saveChallenge() {
            req.body.date = new Date();
            return new Challenge(req.body)
                .save();
        }
    };
};