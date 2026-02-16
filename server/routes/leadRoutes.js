const express = require('express');
const router = express.Router();
const {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead,
    getLeadStats,
} = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { validateLead } = require('../utils/validators');

router.route('/')
    .get(protect, admin, getLeads)
    .post(validationMiddleware(validateLead), createLead);

router.get('/stats/dashboard', protect, admin, getLeadStats);

router.route('/:id')
    .get(protect, admin, getLead)
    .put(protect, admin, updateLead)
    .delete(protect, admin, deleteLead);

module.exports = router;
