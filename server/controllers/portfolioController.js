const Portfolio = require('../models/Portfolio');

// @desc    Get all portfolio items with filtering
// @route   GET /api/portfolio
// @access  Public
const getPortfolios = async (req, res) => {
    try {
        const { category, page = 1, limit = 12 } = req.query;

        const query = category ? { category } : {};

        const portfolios = await Portfolio.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Portfolio.countDocuments(query);

        res.json({
            portfolios,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
const createPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.create(req.body);
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
const updatePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
const deletePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' });
        }

        await portfolio.deleteOne();
        res.json({ message: 'Portfolio item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get portfolio categories with counts
// @route   GET /api/portfolio/stats/categories
// @access  Public
const getPortfolioCategories = async (req, res) => {
    try {
        const categories = await Portfolio.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioCategories,
};
