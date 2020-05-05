'use strict'
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            categoryName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING
            },
            imageName: {
                type: DataTypes.STRING
            }
        },
        {}
    )
    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            onDelete: 'cascade'
        })
    }
    return Category
}
