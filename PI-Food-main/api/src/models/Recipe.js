const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // validate: {
      //   isUUID: 4,
      // },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isAlpha: true,
      // },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spoonacularScore: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        max: 100,
        min: 0,
      },
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        max: 100,
        min: 0,
      },
    },
    steps: {
      type: DataTypes.TEXT,
    },
  });
};
