'use strict'
module.exports = (sequelize, DataTypes) => {
    const SemisCategory = sequelize.define(
        'SemisCategory',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
        },
        {},
    )
    SemisCategory.associate = function (models) {
        SemisCategory.hasMany(models.Semis, {
            onDelete: 'cascade',
        })
    }
    return SemisCategory
}
