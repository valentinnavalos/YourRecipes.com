const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishSummary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      //la puntuacion puede ser flotante??
    },
    healthyRank: {
      type: DataTypes.INTEGER,
      //que tipo de dato debe ser el nivel? integer?
    },
    steps: {
      type: DataTypes.TEXT,
    },
  });
};
