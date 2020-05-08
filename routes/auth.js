const router = require("express").Router();
const { signUp, logIn, user, categories} = require("../controllers/auth");

router.post('/api/v1/signup', signUp);
router.post("/api/v1/login", logIn);
router.get('/api/v1/user', user);
router.get('/api/v1/categories', categories)
module.exports = router;

