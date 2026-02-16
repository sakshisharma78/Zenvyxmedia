const validationMiddleware = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);

        if (error) {
            console.error('Validation Error:', error.details[0].message);
            console.error('Received Body:', req.body);
            return res.status(400).json({
                message: 'Validation error',
                details: error.details[0].message
            });
        }

        next();
    };
};

module.exports = validationMiddleware;
