import sequelize, { Op } from 'sequelize';
import getDatabase from './database.mjs';

const allTrips = await getDatabase()
  .then(async (database) => {
    const mappedTrips = await database.Trip.findAll()
      .then((trips) => trips.map((value, index) => value.dataValues));
    return mappedTrips;
  })
  .catch((error) => {
    console.error(error.message);
    throw error;
  });

const filteredTrips = await getDatabase()
  .then(async (database) => {
    const mappedTrips = await database.Trip.findAll({
      where: {
        start_date: {
          [Op.gt]: new Date(),
        },
      },
      order: sequelize.col('start_date'),
    })
      .then((trips) => trips.map((value, index) => value.dataValues));
    return mappedTrips;
  })
  .catch((error) => {
    console.error(error.message);
    throw error;
  });

const findTripWithDatabase = async (database, id, t = null) => {
  const foundTrip = await database.Trip.findByPk(id, {
    transaction: t,
    lock: true,
  });
  return foundTrip;
};

const findTrip = async (id, t = null) => {
  const trip = await getDatabase()
    .then(async (database) => {
      const foundTrip = await database.Trip.findByPk(id, {
        transaction: t,
        lock: true,
      });
      return foundTrip;
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
  return trip;
};

async function findRandomTrip() {
  const trip = await getDatabase()
    .then(async (database) => {
      const foundTrip = await database.Trip.findOne({
        order: database.sequelize.random(),
      });
      return foundTrip;
    })
    .catch((error) => {
      console.error(error.message);
      throw error;
    });
  return trip;
}

async function withCommit(t, callback) {
  await t.commit();
  return callback();
}

async function withRollback(t, callback) {
  await t.rollback();
  return callback();
}

export default {
  allTrips, filteredTrips, findTrip, findRandomTrip, withCommit, withRollback,
};
