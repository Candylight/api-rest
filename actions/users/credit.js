module.exports = (server) => {
    const User = server.models.User;

    return (req,res,next) => {
        User.findById(req.params.id, (err, user) => {
            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.status(404).send();

            User.findById(req.params.idUser, (err,userCredit) => {
                if(err)
                    return res.status(500).send(err);
                if(!userCredit)
                    return res.status(404).send();

                // If there is a value and "value" is a number
                if(req.params.value && isNaN(req.params.value)){
                    let value = req.params.value;
                    userCredit.credit += value;

                    userCredit.save((err,instance) =>{
                        if(err)
                            return res.status(500).send(err);
                        res.status(204).send();
                    });
                }
            });

        });
    };
};
