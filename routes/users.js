const router = require('express').Router();

module.exports = (server) => {

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.User.schema),
        server.actions.users.create
    );

    router.get('/',
        server.actions.users.list
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureCurrentUser,
        server.actions.users.show
    );

    router.put('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureCurrentUser,
        server.middlewares.clean(['password', '_id']),
        server.actions.users.update
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.users.remove
    );

    router.post('/:id/credit/:idUser/:value',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.users.credit
      );

    router.post('/:id/assign/:botId',
        server.actions.users.assign
    );

    router.post('/:id/drop/:botId',
        server.actions.users.drop
    );

    router.post('/:id/buyWeapon',
      server.middlewares.ensureAuthenticated,
      server.actions.users.buyWeapon
    );

    router.get('/:id/boughtWeapons',
      server.middlewares.ensureAuthenticated,
      server.actions.users.boughtWeapons
    );

    router.get('/:id/myBots',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureCurrentUser,
        server.actions.users.myBots
    );

    return router;
};
