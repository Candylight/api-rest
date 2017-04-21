module.exports = (server) => {
    const User = server.models.User;
    const Weapon = server.models.Weapon;

    return (req,res,next) => {
        User.findById(req.params.id, (err, user) => {
            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.status(404).send();

            Weapon.findById(req.params.weaponId, (err,weapon) => {
                if(err)
                    return res.status(500).send(err);
                if(!weapon)
                    return res.status(404).send();

                if(weapon.owner !== undefined || weapon.bot !== undefined || user.credit < weapon.prix)
                  return res.status(403).send();

                weapon.owner = req.params.id;
                user.weapons.push(req.params.weaponId);
                user.credit -= weapon.prix;
                user.update(user, (err, user) => {
                    if (err)
                        return res.status(500).send(err);

                    weapon.update(weapon, (err, weapon) => {
                      if (err)
                      return res.status(500).send(err);

                      res.status(204).send();
                    });
                });
            });
        });
    };
};
