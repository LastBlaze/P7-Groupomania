const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true //active le champ creer le et modifier
});