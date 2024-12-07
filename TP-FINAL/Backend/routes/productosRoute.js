const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');

router.get('/', productosController.getProductos);
router.post('/', productosController.createProductos);
router.put('/:id', productosController.updateProductos);
router.delete('/:id', productosController.deleteProductos);

module.exports = router;