const router = require('express').Router();

const {getUsers, createUser, getSingleUser, deleteUser, updateUser, getFriendId, deleteFriend} = require('../../controllers/userController')

// api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userid
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(getFriendId).delete(deleteFriend)



module.exports = router;