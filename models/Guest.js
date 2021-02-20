"use strict";
module.exports = (sequelize, DataTypes) => {
    const Guest = sequelize.define("Guest",
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
    );
    Guest.associate = function(models) {
        Guest.hasMany(models.Post, {
            onDelete: "cascade"
        });
        Guest.hasOne(models.Profile, {
            onDelete: "cascade"
        });
        Guest.hasOne(models.Role, {
            onDelete: "cascade"
        });
    };
    return Guest;
};
