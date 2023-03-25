const tripModel = (sequelize, Sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_alt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartDate(value) {
          if (value < this.start_date) {
            throw new Error('End date must be after start date');
          }
        },
      },
    },
    tickets_left: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'Trips',
  });

  return Trip;
};

export default tripModel;
