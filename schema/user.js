module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define(
        'user', {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'userName'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            avatar:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'avatar'
            }
        }, {
            timestamps: false
        }
    )


    return user
}