const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null) {
            const message = 'Un pokémon demande n\'existe pas.Ressayez avec un autre identifiant';
            return res.statut(404).json({ message, data: pokemon })
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = 'Le pokemons n\'a  pu etre recuperee! Reessayez dans quelques instants'
        res.status(500).json({message, data:error})
      })
  })
}