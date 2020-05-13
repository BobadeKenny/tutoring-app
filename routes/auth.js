const router = require("express").Router();
const { signUp, logIn, adminSignup, adminLogin, getSubjectByCategory, getAllCategories, createSubject} = require("../controllers/auth");

router.post('/api/v1/signup', signUp);
router.post("/api/v1/login", logIn);
router.post('/api/v1/admin/signup', adminSignup);
router.post('/api/v1/admin/login', adminLogin);
router.get('/api/v1/subjects/:category', getSubjectByCategory);
router.get('/api/v1/subjects/categories', getAllCategories
router.get('/api/v1/subjects/categories', getAllCategories);
router.post('/api/v1/subjects/create', createSubject);
module.exports = router;

