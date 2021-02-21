module.exports = function(sequelize, DataTypes) {
    const lession = sequelize.define(
        'lession', {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'userId'
            },
            aId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'aId'
            },

        }, {
            timestamps: false,
            freezeTableName: true
        }
    )


    return lession
}