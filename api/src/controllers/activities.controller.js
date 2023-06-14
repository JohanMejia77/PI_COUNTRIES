const { Activity, Country, CountryActivity } = require('../db.js');
require('../db.js');
const { v4: uuidv4 } = require('uuid');
const postActivity = async (req, res) => {
    try {
        const { name, difficult, duration, season, countries } = req.body;
        if (!name || !difficult || !duration || !season || !countries) throw Error('La información de la actividad está incompleta');
  
        const newActivity = await Activity.create({
            id: uuidv4(),
            name,
            difficult,
            duration,
            season,
        });
  
        if (countries.length > 0) {
            const associatedCountries = await Country.findAll({
            where: {
            id: countries,
            },
            });
            await newActivity.addCountries(associatedCountries);
        }
        res.json(newActivity);
    } catch (error) {
        res.status(404).json(error);
    }
};  
const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        if(!activities.length) return res.json({message: 'No hay actividades'});
        res.json(activities); 
    } catch (error) {
        return res.status(500).json({error: error.message});   
    }
}
const updateActivity = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, difficult, duration, season} = req.body;

        const activity = await Activity.findByPk(id);

        if(!activity) throw Error('La actividad con el id suministrado no existe');

        activity.name = name ?? activity.name;
        activity.difficulty = difficult ?? activity.difficulty;
        activity.duration = duration ?? activity.duration;
        activity.season = season ?? activity.season;

        await activity.save();

        res.json(activity);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};
const deleteActivity = async (req, res) => {
    try {
        const { activityId, countryId } = req.body;
        const deletedRows = await CountryActivity.destroy({
            where: {
              activityId,
              countryId,
            },
        });
      
        if (!deletedRows) {
            throw new Error('La actividad con el id y el país suministrados no existe en la tabla intermedia.');
        }
        res.json({message: 'Se ha eliminado la actividad'})
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}
module.exports = {
    postActivity,
    getActivities,
    updateActivity,
    deleteActivity
}