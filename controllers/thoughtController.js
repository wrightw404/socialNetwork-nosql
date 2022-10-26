const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .sort({ createAt: -1})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },

    // createThoughts(req, res) {
    //     Thought.create(req.body).then((thought) => {
    //     User.findByIdAndUpdate(
    //         { _id: req.body.userId },
    //         { $push: { thoughts: thought._id }},
    //         { new: true})
    //     }).then((thought) =>
    //         !user
    //             ? res.status(404).json({ message: 'No thought with that ID' })
    //             : res.json(thought)
    //     ).catch((err) => {
    //         console.log(err);
    //         return res.status(500).json(err)
    //     });
    // },

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
    }

 



}