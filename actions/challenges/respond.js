module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req,res,next) => {
        let challenge;

        Challenge.findById(req.params.id)
            .then(ensureChallenge)
            .then(ensureChallengeIsOpen)
            .then(ensureUserIsTarget)
            .then(updateChallenge)
            .then(res.noContent)
            .catch(res.error);

        function ensureChallenge(rChallenge) {
            return rChallenge ? challenge = rChallenge : Promise.reject({error: 404});
        }

        function ensureChallengeIsOpen() {
            if(challenge.status != "Pending")
                return Promise.reject({error: 403});
        }

        function ensureUserIsTarget() {
            return challenge.target.toString() == req.userId ? true : Promise.reject({error: 403});
        }

        function updateChallenge() {
            if(req.params.response == 0)
                return Challenge.findByIdAndUpdate(req.params.id,{
                    status: "Canceled"
                });
            else
                return Challenge.findByIdAndUpdate(req.params.id,{
                    status: "Selecting"
                });
        }
    };
};

