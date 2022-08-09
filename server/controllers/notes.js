const Notes = require('../models/note')

const noteControl = {
    getNotes: async (req, res) => {
        try {
            const notes = await Notes.find({user_id: req.user.id})
            res.json(notes)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    postNotes: async (req, res) => {
        try {
            const {title, content, date} = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id
            })
                await newNote.save()
                res.json('Note posted')
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    deleteNote: async (req, res) => {
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json('Deleted a note')
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    updateNote: async (req, res) => {
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id}, {
                title, content, date
            })
            res.json('Updated a note')
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    getNote: async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

module.exports = noteControl