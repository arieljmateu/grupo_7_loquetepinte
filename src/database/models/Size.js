module.exports = (sequelize, dataTypes) => {
    const alias = 'Size';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        // created_at: dataTypes.DATETIME,
        // updated_at: dataTypes.DATETIME,
    };
    const config = {
        tableName: 'sizes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    const Size = sequelize.define(alias, cols, config);

    Size.associate = models => {
        Size.hasMany(models.Product, {
            as: "products",
            foreignKey: "size_id"
        });
    };

    return Size;
};