'use strict'
module.exports = (sequelize, DataTypes) => {
    const CashShift = sequelize.define(
        'CashShift',
        {
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            opened: {
                type: DataTypes.DATE,
            },
            closed: {
                type: DataTypes.DATE,
            },
            isOpen: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            manager: {
                type: DataTypes.STRING,
            },
            total: {
                type: DataTypes.BIGINT,
            },
        },
        {},
    )
    CashShift.associate = function (models) {
        CashShift.hasMany(models.Order, {
            onDelete: 'cascade',
        })
    }
    return CashShift
}
