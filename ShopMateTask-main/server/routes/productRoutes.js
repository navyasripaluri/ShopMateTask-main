const express = require('express');
const router = express.Router();
const multer = require("multer");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    generateDescription,
    generateDetailsFromImage
} = require('../controllers/productController');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});
const {
    semanticSearch
} = require('../controllers/productController');
router.post(
    '/generate-details-from-image',
    upload.single('image'),
    generateDetailsFromImage
);


router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

router.post('/generate-description', generateDescription);
router.get('/search/semantic', semanticSearch);
module.exports = router;