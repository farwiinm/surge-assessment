const noteControl = require('../controllers/notes');
const auth = require('../middlewares/auth');
const note = require('../models/note');

const router = require('express').Router();

router.route('/')
    .get(auth, noteControl.getNotes)
    .post(auth, noteControl.postNotes)

router.route('/:id')
    .get(auth, noteControl.getNote)
    .put(auth, noteControl.updateNote)
    .delete(auth, noteControl.deleteNote)

module.exports = router;