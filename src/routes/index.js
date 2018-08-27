import express from 'express';

//import auth from './auth';
import users from '../modules/users/routes';
import devices from '../modules/devices/routes';
import alisa from '../modules/alisa/routes';

import response from '../helpers/response';

const routes  = express.Router();
routes.use(response.setHeadersForCORS);

// TODO 
//routes.use('/api/auth', auth);

routes.use('/users', users);
routes.use('/devices', devices);
routes.use('/api/alisa', alisa);

routes.use(function(req, res) {
  response.sendNotFound(res);
});

module.exports = routes;
