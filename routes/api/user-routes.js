const router = require('express').Router();

const {getUsers, createUser, getSingleUser, deleteUser, updateUser} = require('../../controllers/userController')

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userid
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);



module.exports = router;