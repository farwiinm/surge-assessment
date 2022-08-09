const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if(!token) return res.status(400).json({message: "No token provided"})

        jwt.verify(token, process.env.TOKEN, (err, user) => {
            if(err) return res.status(400).json({message: "Wrong token provided"})

            req.user = user;
            next()
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = auth