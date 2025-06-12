// server/validation/jobValidation.js
const { body } = require('express-validator');

// Validation rules for creating and updating job applications
const jobValidationRules = [
    body('company', 'Company name is required').notEmpty().trim().escape(),
    body('role', 'Role is required').notEmpty().trim().escape(),
    body('dateApplied', 'Invalid date applied').isISO8601().toDate(), // Checks for YYYY-MM-DD format
    body('status', 'Invalid status').isIn(['Applied', 'Interview Scheduled', 'Rejected', 'Offer Received']),
    body('notes').optional().trim().escape(), // Notes are optional
];

module.exports = {
    jobValidationRules,
};