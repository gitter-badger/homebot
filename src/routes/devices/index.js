import express from 'express';

import devices from '../../controllers/devices';
import auth from '../../controllers/auth';

const routes = express.Router({ mergeParams: true })

routes.use(auth.verifyToken);

routes.route('/')
  .get(devices.list)
  .post(devices.create)

routes.route('/:id')
  .get(devices.read)
  .put(devices.update)
  .delete(devices.delete)

module.exports = routes;