import { Sequelize, DataTypes } from 'sequelize';
import tripModel from './trip.mjs';
import registrationModel from './registration.mjs';

// Połączenie z bazą danych
const sequelize = new Sequelize('postgres://zo429578:iks@localhost:11212/bd');

const getDatabase = async () => {
  try {
    // Sprawdzenie poprawności połączenia
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    const database = {};

    database.sequelize = sequelize;

    database.Trip = tripModel(sequelize, Sequelize, DataTypes);

    database.Registration = registrationModel(sequelize, Sequelize, DataTypes);

    database.Trip.hasMany(database.Registration, {
      foreignKey: {
        allowNull: false,
        name: 'trip_id',
      },
    });

    database.Registration.belongsTo(database.Trip);

    // Synchronizacja
    await database.sequelize.sync();

    return database;
  } catch (error) {
    console.error(error.message);
    console.log('Nie udało się nawiązać połączenia.');
    throw error;
  }
};

export default getDatabase;
