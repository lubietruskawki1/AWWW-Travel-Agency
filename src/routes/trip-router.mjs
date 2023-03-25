import express from 'express';

import tripController from '../controllers/trip-controller.mjs';

const tripRouter = express.Router();

tripRouter.get('/', tripController.get);
tripRouter.get('/:id(\\d+)', tripController.getTrip);
tripRouter.get('/:id(\\d+)/sukces', tripController.getSuccess);

export default tripRouter;
