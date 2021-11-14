module.exports = (sequelize, dataTypes) => {
    const alias = 'Category';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        // created_at: dataTypes.DATETIME,
        // updated_at: dataTypes.DATETIME,
    };
    const config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = models => {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        });
    };

    return Category;
};