export default (sequelize, DataTypes) => {
    const Subscriber = sequelize.define("subscriber", {
        username: {
            type: DataTypes.STRING
        }
    });

    Subscriber.associate = (models) => {
        Subscriber.belongsToMany(models.File, {
            through: 'subscriber_files',
            foreignKey: {
                name: 'subscriberId',
                field: 'subscriber_id',
            }
        });
    };

    return Subscriber;
};