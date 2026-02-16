const express = require('express');
const router = express.Router();
const {
    getTestimonials,
    getFeaturedTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, admin } = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { validateTestimonial } = require('../utils/validators');

router.route('/')
    .get(getTestimonials)
    .post(protect, admin, validationMiddleware(validateTestimonial), createTestimonial);

router.get('/featured', getFeaturedTestimonials);

router.route('/:id')
    .put(protect, admin, updateTestimonial)
    .delete(protect, admin, deleteTestimonial);

module.exports = router;
