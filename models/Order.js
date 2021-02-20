'use strict'
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tableNumber: {
                type: DataTypes.INTEGER,
            },
            takeaway: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            delivery: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            address: {
                type: DataTypes.STRING,
            },
            contact: {
                type: DataTypes.STRING,
            },
            user: {
                type: DataTypes.STRING,
            },
            isPayed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {},
    )
    Order.associate = function (models) {
        Order.belongsTo(models.CashShift, {
            onDelete: 'cascade',
        })
        Order.hasMany(models.Guest, {
            onDelete: 'cascade',
        })
        Order.hasMany(models.Product, {
            onDelete: 'cascade',
        })
        Order.hasOne(models.User, {
            onDelete: 'cascade',
        })
    }
    return Order
}
