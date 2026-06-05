const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public Product Catalog Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin-Only Catalog Customization Routes (handles optional product image uploading)
router.post('/', verifyAdmin, upload.single('image'), productController.createProduct);
router.put('/:id', verifyAdmin, upload.single('image'), productController.updateProduct);
router.delete('/:id', verifyAdmin, productController.deleteProduct);

module.exports = router;
