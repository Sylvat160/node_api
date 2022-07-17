const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
        if(pokemon === null) {
            const message = 'Un pokémon demande n\'existe pas.Ressayez avec un autre identifiant';
            return res.statut(404).json({ message, data: pokemon })
        }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
      .catch(error => {
        const message = 'Le pokemons n\'a etre recuperee! Reessayez dans quelques instants'
        res.status(500).json({message, data:error})
      })
    })
  })
}