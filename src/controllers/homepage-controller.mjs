import utilities from '../services/database-manager.mjs';

const homepageController = {
  get: (req, res) => {
    res.redirect('/strona-glowna/1');
  },

  getPage: (req, res, next) => {
    const { page } = req.params;
    const trips = utilities.filteredTrips;
    if (trips.length === 0) {
      next('Przepraszamy, obecnie nie ma dostępnych żadnych wycieczek');
    } else if (page >= 1 && page <= Math.ceil(trips.length / 3)) {
      res.render('homepage', { name: 'homepage', trips, page: req.params.page });
    } else {
      res.redirect('/strona-glowna/1');
    }
  },
};

export default homepageController;
