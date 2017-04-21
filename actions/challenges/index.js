module.exports = (server) => {
    return {
        create: require('./create')(server),
        update: require('./update')(server),
        list: require('./list')(server),
        show: require('./show')(server),
        remove: require('./remove')(server),
        respond: require('./respond')(server),
        run: require('./run')(server),
        assign: require('./assign')(server)
    };
};
