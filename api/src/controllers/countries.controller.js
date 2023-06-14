const { Country, Activity, CountryActivity } = require('../db.js');
const { Op } = require('sequelize');
const capitalize = require('../utils/capitalize.js');

const getCountries = async (req, res) => {
    try {
      if (req.query.name) {
        const { name } = req.query;
        const foundCountry = await Country.findAll({
          where: {
            name: { [Op.iLike]: `%${capitalize(name)}%` }
          },
          include: [
            {
              model: Activity,
              attributes: ['id','name', 'difficult', 'duration', 'season'],
              through: {
                model: CountryActivity,
                attributes: []
              }
            }
          ]
        });
        if (!foundCountry.length) throw Error('El país no existe');
        res.status(200).json(foundCountry);
      } else {
        const countries = await Country.findAll({
          include: {
            model: Activity,
            attributes: ['id','name', 'difficult', 'duration', 'season'],
            through: {
              model: CountryActivity,
              attributes: []
            }
          }
        });
        res.status(200).json(countries);
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };  
const getCountryById = async (req, res) => {
    try {
        const {id} = req.params;
        const foundCountry = await Country.findByPk(id, {
            include: {
                model: Activity,
                attributes: ['id','name', 'difficult', 'duration', 'season'],
                through: {attributes: []}
            }
        });
        if(!foundCountry) throw Error(`El país con el id ${id} no existe`);
        res.json(foundCountry);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
}
module.exports = {
    getCountries,
    getCountryById,
}