const { DataTypes } = require("sequelize");

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
          msg: "It cannot be an empty string.",
        },
      },
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "It cannot be an empty string.",
        },
      },
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: [100],
          msg: "It cannot be more than 100.",
        },
        min: {
          args: [0],
          msg: "It must be a possitive value.",
        },
      },
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: [100],
          msg: "It cannot be more than 100.",
        },
        min: {
          args: [0],
          msg: "It must be a possitive value.",
        },
      },
    },
    steps: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });
};
