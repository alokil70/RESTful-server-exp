'use strict'
module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define(
        'Position',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    )
    Position.associate = function(models) {
        Position.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Position
}
