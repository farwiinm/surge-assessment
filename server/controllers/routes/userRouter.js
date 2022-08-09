const router = require('express').Router();
const userControl = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/login', userControl.loginUser)
router.post('/register', userControl.registerUser)
router.get('/verify',userControl.verifiedUser)

module.exports = router;