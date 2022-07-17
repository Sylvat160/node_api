const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req,res) => {
        User.findOne({where : {username : req.body.username} }).then(user => {
            if(!user){
                const message = 'L\'utilisateur demande n\'existe pas'
                return res.json({message})
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid){
                    const message = 'Le mot de passe entre est incorrect'
                    return res.status(401).json({message})
                }

                //JWT
                const token = jwt.sign(
                    {userId : user.id},
                    privateKey,
                    {expiresIn : '24h'}
                )

                const message = 'L\'utilsateur a ete connecte avec succes'
                return res.json({message, data:user, token})
                
            })
        })
        .catch(err => {
            const message = 'L\'utilisateur n\'a pas pu etre connecte. Reessayez dans quelques instants!'
            return res.json({message,data:err})
        })
    })
}