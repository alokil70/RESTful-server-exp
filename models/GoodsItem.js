'use strict'
module.exports = (sequelize, DataTypes) => {
    const GoodsItem = sequelize.define(
        'GoodsItem',
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
    GoodsItem.associate = function (models) {
        /*        Product.hasMany(models.Position, {
            onDelete: 'cascade'
        })*/
        GoodsItem.belongsTo(models.GoodsCategory, {
            onDelete: 'cascade',
        })
    }
    return GoodsItem
}
