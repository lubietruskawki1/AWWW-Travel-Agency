import utilities from '../services/database-manager.mjs';

const formController = {
  get: (req, res, next) => {
    const { findRandomTrip } = utilities;
    const trips = utilities.allTrips;
    findRandomTrip()
      .then((trip) => {
        if (trip) {
          res.render('form', { name: 'form', trip, trips });
        } else {
          next('Wycieczka o podanym identyfikatorze nie istnieje');
        }
      })
      .catch((error) => {
        next('Wycieczka o podanym identyfikatorze nie istnieje');
      });
  },

  getForm: (req, res, next) => {
    const { findTrip } = utilities;
    const trips = utilities.allTrips;
    findTrip(req.params.id)
      .then((trip) => {
        if (trip) {
          res.render('form', { name: 'form', trip, trips });
        } else {
          next('Wycieczka o podanym identyfikatorze nie istnieje');
        }
      })
      .catch((error) => {
        next('Wycieczka o podanym identyfikatorze nie istnieje');
      });
  },
};

export default formController;
