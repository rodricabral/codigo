const express = require('express');

const router = express.Router()
const { validadorFirebase } = require('../middleweares/validadorFirebase');
const salonController = require('../controllers/salonController');


router.get('/',[validadorFirebase], salonController.getSalones)
router.post('/',[validadorFirebase], salonController.createSalon)
router.put('/:id',[validadorFirebase], salonController.updateSalon)
router.delete('/:id',[validadorFirebase], salonController.deleteSalon)

module.exports = router;