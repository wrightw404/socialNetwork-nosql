const router = require('express').Router();

const { getThoughts, createThoughts, getSingleThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// api/thoughts/:thoughtsId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);


// neeed to import createReaction 
router.route('/:thoughtId/reactions').post(createReaction)

// neeed to import createReaction 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;