const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {
    if(req.query.name){
      const name = req.query.name
      // return Pokemon.findAll({ where: {name : name} })
      return Pokemon.findAll({
        where: {
          name : { // correspond a la propriete du model Pokemon
            [Op.like]:`%${name}%` // correspond au critere de la recherche  
          }
        },
        limit:5
      })
      .then(pokemons => {
        const message = `IL y'a ${pokemons.length} pokemon(s) qui corresponde(nt) qu terme de recherche ${name}.`
        res.json({message, data : pokemons})
      })
    } else {
      Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = 'La liste des pokemons n\'a pas pu etre trouvee! Reessayez dans quelques instants'
        res.status(500).json({message, data:error})
      })
    }
    
  })
} 