module.exports = (server) => {
    server.actions = {
        bots: require('./bots')(server),
        weapons: require('./weapons')(server),
        users: require('./users')(server),
        auth: require('./auth')(server),
        challenges: require('./challenges')(server)
    };
};