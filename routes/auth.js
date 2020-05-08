const router = require("express").Router();
const { signUp, logIn, user, grantAccess,getUsers, updateUser, deleteUser} = require("../controllers/auth");

router.post('/api/v1/signup', signUp);
router.post("/api/v1/login", logIn);
router.get('/api/v1/user', user);
router.get('/api/v1/users', grantAccess('readAny','profile'), getUsers)
router.put('/api/v1/user/:userId', grantAccess('updateAny','profile'), updateUser)
router.delete('/api/v1/user/:userId', grantAccess('deleteAny','profile'), deleteUser)
module.exports = router;

