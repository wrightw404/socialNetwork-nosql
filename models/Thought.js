const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 120,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userName: {
        type: String,
        required: true
    },
    reactions: []

}, {
    toJSON: {
        getters: true
    },
    id: false

})

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought; 