'use strict'
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
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
    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            onDelete: 'cascade',
        })
    }
    return Category
}
