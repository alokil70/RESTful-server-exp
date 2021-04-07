'use strict'
module.exports = (sequelize, DataTypes) => {
    const Semis = sequelize.define(
        'Semis',
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
    Semis.associate = function (models) {
        /*        Product.hasMany(models.Position, {
            onDelete: 'cascade'
        })*/
        Semis.belongsTo(models.SemisCategory, {
            onDelete: 'cascade',
        })
    }
    return Semis
}
