const { User, Thought } = require('../models');

module.exports = {
//crud functions
    getUsers(req, res) {
        User.find()
        .select("-__v")
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    createUser(req, res) {
        User.create(req, body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        });
    },







}