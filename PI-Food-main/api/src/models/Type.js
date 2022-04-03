const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      name: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: [true],
            msg: "It do not be an empty string.",
          },
          unique: true,
        },
      },
    },
    { timestamps: false }
  );
};
