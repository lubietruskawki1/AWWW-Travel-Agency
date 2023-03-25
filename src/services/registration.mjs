const registrationModel = (sequelize, Sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'Registrations',
  });

  return Registration;
};

export default registrationModel;
