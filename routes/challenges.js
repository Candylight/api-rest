const router = require('express').Router();

module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.Challenge.schema),
        server.middlewares.ensureAuthenticated,
        server.middlewares.clean(['winner','bots','status','date']),
        server.actions.challenges.create
    );

    router.get('/',
        server.actions.challenges.list
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.challenges.show
    );

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.actions.challenges.update
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.challenges.remove
    );

    router.post('/respond/:id/:response',
        server.middlewares.ensureAuthenticated,
        server.actions.challenges.respond
    );

    router.post('/:id/assign/:botId',
        server.middlewares.ensureAuthenticated,
        server.actions.challenges.assign
    );

    router.post('/run/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.challenges.run
    );

    router.get('/palmares/:id',
        server.actions.challenges.palmares
    );

    return router;
};
