'use strict'
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
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
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {},
    )
    Product.associate = function (models) {
        /*        Product.hasMany(models.Position, {
            onDelete: 'cascade'
        })*/
        Product.belongsTo(models.Category, {
            onDelete: 'cascade',
        })
    }
    return Product
}
