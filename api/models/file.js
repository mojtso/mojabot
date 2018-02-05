export default (sequelize, DataTypes) => {
    const File = sequelize.define("file", {
        link: {
            type: DataTypes.STRING
        }
    });

    File.associate = (models) => {
        //1:M
        File.belongsTo(models.Subscriber, {
            foreignKey: {
                name: 'subscriberOwner',
                field: 'subscriber_owner',
                type: DataTypes.INTEGER
            }
        });
    };
    
    return File;
};

