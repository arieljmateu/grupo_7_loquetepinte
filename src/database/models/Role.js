module.exports = (sequelize, dataTypes) => {
    const alias = 'Role';
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
        tableName: 'roles',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    const Role = sequelize.define(alias, cols, config);

    Role.associate = models => {
        Role.hasMany(models.User, {
            as: "users",
            foreignKey: "role_id"
        });
    };

    return Role;
};