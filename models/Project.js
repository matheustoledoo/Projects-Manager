const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    responsible: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    fieldExecutionDate: {
        type: DataTypes.DATE,
    },
    fieldExecutionTime: {
        type: DataTypes.FLOAT,
    },
    fieldTechnician: {
        type: DataTypes.STRING,
    },
    processingExecutionDate: {
        type: DataTypes.DATE,
    },
    processingExecutionTime: {
        type: DataTypes.FLOAT,
    },
    processingTechnician: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('a fazer', 'fazendo', 'feito'),
        defaultValue: 'a fazer',
    },
    notes: {
        type: DataTypes.TEXT,
    },
});

Project.belongsTo(User, { as: 'creator' });
module.exports = Project;
