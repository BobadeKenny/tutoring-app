const router = require("express").Router();
const { signUp, logIn, adminSignup, adminLogin, getSubjectByCategory, getAllCategories, createSubject, getTutors, getTutor, deleteTutor} = require("../controllers/auth");

router.post('/api/v1/signup', signUp);
router.post("/api/v1/login", logIn);
router.post('/api/v1/admin/signup', adminSignup);
router.post('/api/v1/admin/login', adminLogin);
router.get('/api/v1/subjects/:category', getSubjectByCategory);
router.get('/api/v1/subjects/categories', getAllCategories);
router.post('/api/v1/subjects/create', createSubject);
router.get('/api/v1/tutors', getTutors);
router.get('/api/v1/tutors/:id', getTutor);
router.delete('/api/v1/tutors/:id', deleteTutor);
module.exports = router;

