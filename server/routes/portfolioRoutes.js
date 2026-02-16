const express = require('express');
const router = express.Router();
const {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioCategories,
} = require('../controllers/portfolioController');
const { protect, admin } = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { validatePortfolio } = require('../utils/validators');

router.route('/')
    .get(getPortfolios)
    .post(protect, admin, validationMiddleware(validatePortfolio), createPortfolio);

router.get('/stats/categories', getPortfolioCategories);

router.route('/:id')
    .get(getPortfolio)
    .put(protect, admin, updatePortfolio)
    .delete(protect, admin, deletePortfolio);

module.exports = router;
