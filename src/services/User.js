const db = require('../database/models');

const User = {
    findByEmail: (userEmail) => db.User.findOne({where: {email: userEmail}}),

    create: function(userData) {
        return db.User.create(userData);
    },

    update: function(userData) {
        const columns = Object.keys(userData).filter(key => key != 'id');
console.log(userData)
        return db.User.update(
            { userData },
            { 
                where: { id: userData.id },
                fields: columns
            }
        ).then((rows) => { console.log(rows);
            return db.User.findByPk(userData.id)
        });
    },

    delete: function(id) {
        return db.User.destoy({where: {id: id} });
    }
}

module.exports = User;