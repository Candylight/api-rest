module.exports = (server) => {
    server.middlewares = {
        bodyParser: require('body-parser'),
        ensureBodyFields: require('./ensureBodyFields'),
        ensureAuthenticated: require('./ensureAuthenticated')(server),
        ensureIsAdmin: require('./ensureIsAdmin')(server),
        clean: require('./clean'),
        logger: require('./logger'),
        res: require('./res')
    };
};