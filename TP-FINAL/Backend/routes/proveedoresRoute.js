const express = require('express');
const router = express.Router();

const proveedoresController = require('../controllers/proveedoresController');

router.get('/', proveedoresController.getProveedores);
router.post('/', proveedoresController.createProveedores);
router.put('/:id', proveedoresController.updateProveedores);
router.delete('/:id', proveedoresController.deleteProveedores);

module.exports = router;