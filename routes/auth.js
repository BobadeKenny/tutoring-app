const router = require("express").Router();
const { signUp, logIn, adminSignup, adminLogin} = require("../controllers/auth");

router.post('/api/v1/signup', signUp);
router.post("/api/v1/login", logIn);
router.post('/api/v1/admin/signup', adminSignup);
router.post('/api/v1/admin/login', adminLogin);
router.post('/api/v1/subjects/:category', adminLogin);

module.exports = router;

