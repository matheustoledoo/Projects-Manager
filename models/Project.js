const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true, // O ID deve ser único
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    responsible: {
        type: DataTypes.JSON,
        allowNull: false
    },
    fieldExecutionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fieldExecutionTime: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fieldTechnician: {
        type: DataTypes.STRING,
        allowNull: false
    },
    processingExecutionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    processingExecutionTime: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    processingTechnician: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Project;
