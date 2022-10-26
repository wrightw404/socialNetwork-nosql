const router = require('express').Router();

const { getThoughts, createThoughts } = require('../../controllers/thoughtController');

// api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// api/thoughts/:thoughtsId

module.exports = router;