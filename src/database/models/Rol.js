module.exports = (sequelize, dataTypes) => {
    const alias = 'Rol';
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

    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = models => {
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: "rol_id"
        });
    };

    return Rol;
};