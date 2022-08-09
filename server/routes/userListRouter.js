const adminControl = require('../controllers/admin');
const auth = require('../middlewares/auth');
const router = require('express').Router();

router.route('/')
    .get(auth, adminControl.getUsers)
    .post(auth, adminControl.postUsers)

router.route('/:id')
    .get(auth, adminControl.getUser)

module.exports = router;