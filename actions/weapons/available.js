module.exports = (server) => {
    const Weapon = server.models.Weapon;

    return (req, res, next) => {
        Weapon.find({bot: {$exists: false}}, (err, instances) => {
            if (err)
                return res.status(500).send(err);

            res.status(200).send(instances);
        });
    }
};
