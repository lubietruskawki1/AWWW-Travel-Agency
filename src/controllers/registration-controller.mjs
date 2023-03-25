import { validationResult } from 'express-validator';
import { Transaction, ValidationError } from 'sequelize';
import utilities from '../services/database-manager.mjs';
import getDatabase from '../services/database.mjs';

const { findRandomTrip } = utilities;
const { findTrip } = utilities;
const { withCommit } = utilities;
const { withRollback } = utilities;

const registrationController = {
  get: async (req, res) => {
    const trip = await findRandomTrip();
    res.redirect(`/formularz/${trip.id}`);
  },

  getRegistration: async (req, res, next) => {
    const trip = await findTrip(req.params.id);
    if (trip) {
      res.render('registration', { name: 'form', trip });
    } else {
      next('Wycieczka o podanym identyfikatorze nie istnieje');
    }
  },

  post: async (req, res, next) => {
    const errors = validationResult(req);
    const values = req.body;

    if (!errors.isEmpty()) {
      const trip = await findTrip(req.params.id);
      return res.render('registration', { name: 'form', trip, errors: errors.array() });
    }

    return getDatabase()
      .then(async (database) => {
        const t = await database.sequelize.transaction();
        const { first_name } = values;
        const { surname } = values;
        const email = values.mail;
        const tickets = values.registrations;

        const trip = await database.Trip.findByPk(req.params.id, {
          transaction: t,
          lock: true,
        });

        if (tickets > trip.tickets_left) {
          return withRollback(t, () => next('Nie ma wystarczająco wolnych miejsc'));
        }

        try {
          const registration = await database.Registration.create({
            trip_id: req.params.id,
            first_name,
            surname,
            email,
            tickets,
          }, { transaction: t });

          await trip.addRegistration(registration);

          await database.Trip.increment(
            { tickets_left: -tickets },
            {
              where: {
                id: req.params.id,
              },
            },
            { transaction: t },
          );

          await trip.save({ transaction: t });

          return withCommit(t, () => res.redirect(`/wycieczka/${req.params.id}/sukces`));
        } catch (error) {
          return withRollback(t, () => next('Nieznany błąd'));
        }
      })
      .catch((error) => next(error));
  },
};

export default registrationController;
