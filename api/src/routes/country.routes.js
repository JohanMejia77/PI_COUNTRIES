const { Router } = require('express');
const { getCountries, getCountryById, } = require('../controllers/countries.controller');
const fillDatabase = require('../utils/fillDatabase');
const router = Router();

router.get('/database', fillDatabase);
router.get('/countries', getCountries);
router.get('/countries/:id', getCountryById);

module.exports = router;