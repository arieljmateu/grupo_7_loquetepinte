module.exports = (sequelize, dataTypes) => {
    const alias = 'Color';
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
        tableName: 'colors',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    const Color = sequelize.define(alias, cols, config);

    Color.associate = models => {
        Color.hasMany(models.Product, {
            as: "products",
            foreignKey: "color_id"
        });
    };

    return Color;
};