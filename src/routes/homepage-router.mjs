import express from 'express';

import homepageController from '../controllers/homepage-controller.mjs';

const homepageRouter = express.Router();

homepageRouter.get('/', homepageController.get);
homepageRouter.get('/:page(\\d+)', homepageController.getPage);

export default homepageRouter;
