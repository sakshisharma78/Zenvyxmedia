const Lead = require('../models/Lead');
const { sendLeadNotification, sendWelcomeEmail } = require('../services/emailService');

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);

        // Send emails asynchronously
        sendLeadNotification(lead).catch(err => console.error('Email error:', err));
        sendWelcomeEmail(lead.email, lead.name).catch(err => console.error('Email error:', err));

        res.status(201).json({
            success: true,
            message: 'Lead submitted successfully!',
            data: lead,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all leads with filters
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = async (req, res) => {
    try {
        const { status, role, serviceInterested, page = 1, limit = 10 } = req.query;

        const query = {};
        if (status) query.status = status;
        if (role) query.role = role;
        if (serviceInterested) query.serviceInterested = serviceInterested;

        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Lead.countDocuments(query);

        res.json({
            leads,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private/Admin
const getLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id
// @access  Private/Admin
const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        await lead.deleteOne();
        res.json({ message: 'Lead removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get lead statistics
// @route   GET /api/leads/stats/dashboard
// @access  Private/Admin
const getLeadStats = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: 'New' });
        const contactedLeads = await Lead.countDocuments({ status: 'Contacted' });
        const closedLeads = await Lead.countDocuments({ status: 'Closed' });

        const leadsByRole = await Lead.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        const leadsByService = await Lead.aggregate([
            { $group: { _id: '$serviceInterested', count: { $sum: 1 } } }
        ]);

        // Get leads by month for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const leadsByMonth = await Lead.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            totalLeads,
            newLeads,
            contactedLeads,
            closedLeads,
            conversionRate: totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(2) : 0,
            leadsByRole,
            leadsByService,
            leadsByMonth,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead,
    getLeadStats,
};
