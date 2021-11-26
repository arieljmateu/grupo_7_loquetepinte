const db = require('../database/models');

const User = {
    findByEmail: (userEmail) => db.User.findOne({where: {email: userEmail}}),

    create: function(userData) {
        return db.User.create(userData);
    },

    delete: function(id) {
        return db.User.destoy({where: {id: id} });
    }
}

module.exports = User;