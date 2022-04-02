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
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "It do not be an empty string.",
        },
      },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "It do not be an empty string.",
        },
      },
    },
    spoonacularScore: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: {
          args: [true],
          msg: "It must be a decimal number.",
        },
        max: {
          args: [100],
          msg: "It do not be more than 100.",
        },
        min: {
          args: [0],
          msg: "It must be a possitive value.",
        },
      },
    },
    healthScore: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: {
          args: [true],
          msg: "It must be a decimal number.",
        },
        max: {
          args: [100],
          msg: "It do not be more than 100.",
        },
        min: {
          args: [0],
          msg: "It must be a possitive value.",
        },
      },
    },
    steps: {
      type: DataTypes.STRING,
      // type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
