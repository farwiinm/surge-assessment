const Users = require('../models/user')
const bcryptjs = require('bcryptjs')

const adminControl = {
    getUsers: async (req, res) => {
        try {
            const users = await Users.find({user_id: req.user.id})
            res.json(users)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    postUsers: async (req, res) => {
        try {
            const {firstName,lastName,email,password,accountType,mobile} = req.body;
            const user = await Users.findOne({email: email})
            if(user) return res.status(400).json({message: "This email already exists"})

            const hash = await bcryptjs.hash(password, 10)
            const newUser = new Users({
                email: email,
                password: hash,
                accountType: accountType,
                firstName: firstName,
                lastName: lastName,
                moible: mobile
            })
            await newUser.save()
            res.json({message: "Created user"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {firstName,lastName,email,password,accountType,mobile} = req.body;
            await Users.findOneAndUpdate({_id: req.params.id}, {
                firstName,lastName,email,password,accountType,mobile
            })
            res.json('Updated a user')
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)
            res.json(user)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

module.exports = adminControl;