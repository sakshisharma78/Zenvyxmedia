const Joi = require('joi');

const validateLead = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid('Creator', 'Brand', 'Agency', 'Other'),
        serviceInterested: Joi.string().max(500),
        socialLink: Joi.string().uri().allow(''),
        budget: Joi.string().max(50),
        message: Joi.string().max(2000),
    });

    return schema.validate(data);
};

const validatePortfolio = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).required(),
        category: Joi.string().valid('Editing', 'Thumbnails', 'Web Development', 'Brand Deals', 'Creator Network', 'Other').required(),
        thumbnail: Joi.string().uri().required(),
        description: Joi.string().max(1000),
        projectLink: Joi.string().uri().allow(''),
    });

    return schema.validate(data);
};

const validateTestimonial = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        role: Joi.string().max(100),
        feedback: Joi.string().min(10).max(1000).required(),
        rating: Joi.number().min(1).max(5),
    });

    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
    });

    return schema.validate(data);
};

module.exports = {
    validateLead,
    validatePortfolio,
    validateTestimonial,
    validateLogin,
};
