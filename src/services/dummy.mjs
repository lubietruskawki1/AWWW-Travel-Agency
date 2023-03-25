import getDatabase from './database.mjs';
import trips from './trips-database.mjs';

const fillDatabase = async () => {
  const filledDatabase = await getDatabase()
    .then(async (database) => {
      await database.Registration.destroy({
        where: {},
        truncate: { cascade: true },
      });
      await database.Trip.destroy({
        where: {},
        truncate: { cascade: true },
      });

      const t = await database.sequelize.transaction();

      await (async () => {
        for (let i = 0; i < trips.length; i++) {
          const trip = await database.Trip.create(trips[i], { transaction: t });
        }
      })();

      await t.commit();

      const trip = await database.Trip.findByPk(1);

      let registration = await database.Registration.create({
        trip_id: 1,
        first_name: 'Melchior',
        surname: 'Gabor',
        email: 'melchior.gabor@gmail.com',
        tickets: '1',
      });
      await trip.addRegistration(registration);

      registration = await database.Registration.create({
        trip_id: 1,
        first_name: 'Wendla',
        surname: 'Bergmann',
        email: 'wendla.bergmann@gmail.com',
        tickets: '1',
      });
      await trip.addRegistration(registration);

      return database;
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
  return filledDatabase;
};

await fillDatabase();
