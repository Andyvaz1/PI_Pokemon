const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("pokemon", {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        hp: {
            type: DataTypes.INTEGER,
        },
        attack: {
            type: DataTypes.INTEGER,
        },
        defence: {
            type: DataTypes.INTEGER,
        },

        speed: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        height: {
            type: DataTypes.INTEGER,
        },
        img: {
            type: DataTypes.STRING,
            defaultValue:
                "https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png",
        },
        dataBase: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });
};
