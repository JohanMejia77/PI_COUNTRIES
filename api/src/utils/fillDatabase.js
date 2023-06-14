require('dotenv').config();
const axios = require('axios');
const {API} = process.env;
const { Country } = require('../db.js');

const fillDatabase = async (req, res) => {
    try {
        const response = await axios.get(API);
        const countries = response.data;
        countries.forEach(async country => {
            await Country.create({
                id: country.cca3,
                name: country.translations.spa.common,
                image: country.flags[0],
                continent: country.continents[0],
                capital: country.capital ? country.capital[0] : 'Sin capital',
                subregion: country.subregion ? country.subregion : 'Sin subregión',
                area: country.area,
                population: country.population
            })
        })
        res.send('Base de datos llenada');
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
module.exports = fillDatabase