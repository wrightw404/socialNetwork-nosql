const { User, Thought } = require('../models');

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
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thought} })
          )
          .then(() => res.json({ message: 'user and thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
     
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    






}