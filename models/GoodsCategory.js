'use strict'
module.exports = (sequelize, DataTypes) => {
    const GoodsCategory = sequelize.define(
        'GoodsCategory',
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
    GoodsCategory.associate = function (models) {
        GoodsCategory.hasMany(models.GoodsItem, {
            onDelete: 'cascade',
        })
    }
    return GoodsCategory
}
