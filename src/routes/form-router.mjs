import express from 'express';

import formController from '../controllers/form-controller.mjs';

const formRouter = express.Router();

formRouter.get('/', formController.get);
formRouter.get('/:id(\\d+)', formController.getForm);

export default formRouter;
