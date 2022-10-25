const { User } = require('../models');

module.exports = {
//crud functions
    getUsers(req, res) {
        User.find()
        .select("-__v")
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("friends")
        .populate("thoughts")
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'cannot find that user' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));

    },

    createUser(req, res) {
        User.create(req.body).then((userData) => {
            res.json(userData)
        }).catch((err) => {
            console.log(err);
            return res.status(500).json(err)
        });
    
    },
    






}