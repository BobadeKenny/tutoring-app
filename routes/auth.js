const router = require("express").Router();
const { signUp, logIn, user} = require("../controllers/auth");

router.post('/api/v1/signup', signUp);
router.post("/api/v1/login", logIn);
router.get('/api/v1/user', user);

module.exports = router;

