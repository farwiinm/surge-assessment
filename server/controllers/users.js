const Users = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControl = {
    registerUser: async (req, res) => {
        try {
            const {email, password, accountType} = req.body;
            const user = await Users.findOne({email: email})
            if(user) return res.status(400).json({message: "This email already exists"})

            const hash = await bcryptjs.hash(password, 10)
            
            const newUser = new Users({
                email: email,
                password: hash,
                accountType: accountType
            })
            await newUser.save()
            res.json({message: "Created user"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
 
    loginUser: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email: email})
            if(!user) return res.status(400).json({message: "User does not exist"})

            const match = await bcryptjs.compare(password, user.password)
            if(!match) return res.status(400).json({message: "Incorrect password"})

            //to create token
            const payload = {id: user._id, email: user.email, accountType: user.accountType}
            const token = jwt.sign(payload, process.env.TOKEN, {expiresIn: "1d"})
            res.json({token})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    verifiedUser: (req, res) => {
        try {
            const token = req.header('Authorization')
            if(!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN, async (err, verified) => {
                if (err) return res.send(false)

                const user = await Users.findById(verified.id)
                if(!user) return res.send(false)
                return res.send(true)
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

module.exports = userControl
