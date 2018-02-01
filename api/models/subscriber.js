export default (sequelize, DataTypes) => {
    const Subscriber = sequelize.define("subsriber", {
        username: {
            type: DataTypes.STRING
        }
    });

    Subscriber.associate = (models) => {
        Subscriber.belongsToMany(models.File, {
            through: 'subscriber_files',
            foreignKey: {
                name: 'subscriber_files',
                feild: 'subscriber_id',
            }
        });
    };

    return Subscriber;
};