const validTypes = ['Plante', 'Poison' , 'Feu' , 'Eau', 'Insecte', 'Normal', 'Vol' , 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg: 'Ce nom existe deja !'
        },
        validate: {
          notEmpty: {msg : 'Impossible de renseigner un champ vide'},
          notNull: { msg: 'La propriete nom doit etre obligatoirement renseignee !'}
        }
      },
      hp: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:'Utilisez uniquement des points entiers pour les points de vie'},
          notNull: {msg : 'Les points de vie sont une propriete requise'},
          min: {
            args:[0],
            msg : 'Les points de vie doivent etre superieurs ou egale a 0.'
          },
          max:{
            args:[999],
            msg: 'Les points de vie doivent etre inferieurs ou egale a 999'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:'Utilisez uniquement des points entiers pour les degats'},
          notNull: {msg : 'Les degats sont une propriete requise'},
          min: {
            args:[0],
            msg : 'doivent etre superieurs ou egale a 0.'
          },
          max:{
            args:[999],
            msg: '9doivent etre inferieurs ou egale a 999'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg:'Le champs doit etre une URL'},
          notNull: {msg : 'L\'image est une propriete requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set (types){
          this.setDataValue('types',types.join())
        },
        validate:{
          isTypeValid(value){
            if (!value){
              throw new Error('Un pokemon doit avoir au moins un type')
            }
            if(value.split(',').length > 3 ){
              throw new Error('Un pokemon ne peut pas acoir plus de trois de types')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error (`Le type d'un pokemon doit appartenir a la liste suivante : ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }