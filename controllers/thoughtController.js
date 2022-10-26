const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .sort({ createAt: -1})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },

    async createThoughts (req, res) {
        try {
            const thoughtData = await Thought.create(req.body)
            const userData =  await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
                );
                if(!userData) {
                    return res.status(404).json({ message: 'thought created but no user found' })
                }
            res.json(thoughtData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'cannot find that thought' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));

    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true}
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },


    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No such thought exists' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'thought deleted, but no users found',
                })
              : res.json({ message: 'thought successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    async createReaction (req, res) {
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true },
                );
            if(!thoughtData) {
                return res.status(404).json({ message: 'No user with this id!' })
            }
            res.status(200).json(thoughtData)
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction (req, res) {
        try{
            const thoughtData = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId} }},
                { runValidators: true, new: true },
                );
            if(!thoughtData) {
                 return res.status(404).json({ message: 'No user with this id!' })
            }
                res.status(200).json(thoughtData)

        } catch(err) {
            res.status(400).json(err);
        }
    },



 



}