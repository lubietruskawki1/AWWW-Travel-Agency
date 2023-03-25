import express from 'express';
import { body } from 'express-validator';
import registrationController from '../controllers/registration-controller.mjs';
import getDatabase from '../services/database.mjs';

const prepareTransaction = (init_transaction = false) => async (req, res, next) => {
  let t = null;
  if (init_transaction) {
    t = await getDatabase()
      .then(async (database) => database.sequelize.transaction());
  }
  res.locals.t = t;
  return next();
};

const registrationRouter = express.Router();

registrationRouter.get('/', registrationController.get);
registrationRouter.get('/:id(\\d+)', registrationController.getRegistration);

const validationBodyRules = [
  body('first_name')
    .notEmpty().withMessage('Proszę wprowadzić imię.'),
  body('surname')
    .notEmpty().withMessage('Proszę wprowadzić nazwisko.'),
  body('mail')
    .notEmpty().withMessage('Proszę wprowadzić adres e-mail.')
    .isEmail()
    .withMessage('Proszę wprowadzić poprawny adres e-mail.'),
  body('registrations')
    .notEmpty().withMessage('Proszę wprowadzić liczbę zgłoszeń.')
    .isInt({ min: 1 })
    .withMessage('Proszę wprowadzić poprawną liczbę zgłoszeń.'),
];

registrationRouter.post('/:id(\\d+)', validationBodyRules, registrationController.post);

export default registrationRouter;
