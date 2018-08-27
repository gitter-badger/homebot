import express from 'express';

import users from '../controllers/users';
//import auth from '../../controllers/auth';
//import devices from '../devices';

const routes  = express.Router();

//routes.use('/:userId/devices', users.loadUser, devices);

routes.route('/:id')
  //.all(auth.verifyToken)
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

routes.route('/')
  //.get(auth.verifyToken, users.list)
  .post(users.create);

module.exports = routes;
