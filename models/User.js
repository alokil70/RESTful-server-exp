'use strict'
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            token: {
                type: DataTypes.STRING
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    )
    User.associate = function(models) {
        User.hasMany(models.Post, {
            onDelete: 'cascade'
        })
        User.hasOne(models.Profile, {
            onDelete: 'cascade'
        })
    }
    return User
}
