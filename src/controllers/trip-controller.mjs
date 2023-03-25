import utilities from '../services/database-manager.mjs';

const { findRandomTrip } = utilities;
const { findTrip } = utilities;
const trips = utilities.filteredTrips;

const tripController = {
  get: (req, res, next) => {
    findRandomTrip()
      .then((trip) => {
        if (trip) {
          res.render('trip', { name: 'trip', trip, trips });
        } else {
          next('Wycieczka o podanym identyfikatorze nie istnieje');
        }
      })
      .catch((error) => {
        next('Wycieczka o podanym identyfikatorze nie istnieje');
      });
  },

  getTrip: (req, res, next) => {
    findTrip(req.params.id)
      .then((trip) => {
        if (trip) {
          res.render('trip', { name: 'trip', trip, trips });
        } else {
          next('Wycieczka o podanym identyfikatorze nie istnieje');
        }
      })
      .catch((error) => {
        next('Wycieczka o podanym identyfikatorze nie istnieje');
      });
  },

  getSuccess: async (req, res, next) => {
    const trip = await findTrip(req.params.id);
    if (trip) {
      res.render('trip', {
        name: 'trip', trip, trips, success: 'Udało się zarezerwować wycieczkę!',
      });
    } else {
      next('Wycieczka o podanym identyfikatorze nie istnieje');
    }
  },
};

export default tripController;
