'use strict'
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'Role',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roleName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rule1: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            rule2: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            rule3: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            rule4: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            rule5: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {},
    )
    Role.associate = function (models) {
        Role.hasMany(models.Post, {
            onDelete: 'cascade',
        })
    }
    return Role
}
