module.exports = (sequelize, dataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(80),
            allowNull: false
        },
        hashed_password: {
            type: dataTypes.CHAR(80),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        telephone: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        avatar: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        // created_at: dataTypes.DATETIME,
        // updated_at: dataTypes.DATETIME,
    };
    const config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rol_id"
        });
    };

    return User;
};