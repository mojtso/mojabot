export default (sequelize, DataTypes) => {
    const File = sequelize.define("file", {
        link: {
            type: DataTypes.STRING
        }
    });

    File.associate = (models) => {
        //1:M
        File.belongsTo(models.Subscriber, {
            through: 'subscriber_files',
            foreignKey: {
                name: 'fileId',
                field: 'field_id',
            }
        });
    };
    
    return File;
};

