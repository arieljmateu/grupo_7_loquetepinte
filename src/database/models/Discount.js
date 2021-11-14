module.exports = (sequelize, dataTypes) => {
    const alias = 'Discount';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(70),
            allowNull: false
        },
        discount_percent: {
            type: dataTypes.DECIMAL(2, 2),
            allowNull: false
        },
        // created_at: dataTypes.DATETIME,
        // updated_at: dataTypes.DATETIME,
    };
    const config = {
        tableName: 'discounts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    const Discount = sequelize.define(alias, cols, config);

    Discount.associate = models => {
        Discount.hasMany(models.Product, {
            as: "products",
            foreignKey: "discount_id"
        });
    };

    return Discount;
};