const router = require("express").Router();
const { signUp, logIn, categories} = require("../controllers/auth");

router.post('/signup', signUp);
router.post("/login", logIn);
router.get('/:user/:token/categories', categories)
module.exports = router;

