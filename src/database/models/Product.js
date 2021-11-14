module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';
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
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(70),
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        size_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        discount_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        // created_at: dataTypes.DATETIME,
        // updated_at: dataTypes.DATETIME,
    };
    const config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.belongsTo(models.Color, {
            as: "color",
            foreignKey: "color_id"
        });

        Product.belongsTo(models.Size, {
            as: "size",
            foreignKey: "size_id"
        });

        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });

        Product.belongsTo(models.Discount, {
            as: "discount",
            foreignKey: "discount_id"
        });
    };

    return Product;
};