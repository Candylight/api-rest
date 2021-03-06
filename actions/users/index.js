module.exports = (server) => {
    return {
        create: require('./create')(server),
        update: require('./update')(server),
        list: require('./list')(server),
        show: require('./show')(server),
        remove: require('./remove')(server),
        credit: require('./credit')(server),
        assign: require('./assign')(server),
        drop: require('./drop')(server),
        buyWeapon: require('./buyWeapon')(server),
        boughtWeapons: require('./boughtWeapons')(server),
        myBots: require('./myBots')(server)
    };
};
