const { Pokemon } = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id',auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null ){
            const message = 'Un pokémon demande n\'existe pas. Ressayez avec un autre identifiant';
            return res.statut(404).json({ message, data: pokemon })
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
      if (error instanceof ValidationError){
        res.status(400).json({message: error.message , data:error})
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({message: error.message , data:error})
      }
        const message = 'Le pokemons n\'a ete trouve! Reessayez dans quelques instants'
        res.status(500).json({message, data:error})
      })
  })
}