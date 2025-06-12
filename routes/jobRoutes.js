// server/routes/jobRoutes.js
const express = require('express');
const {
    getJobApplications,
    getJobApplicationById,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { jobValidationRules } = require('../validation/jobValidation');
const router = express.Router();

router.route('/')
    .get(protect, getJobApplications)
    .post(protect, jobValidationRules, createJobApplication);

router.route('/:id')
    .get(protect, getJobApplicationById)
    .put(protect, jobValidationRules, updateJobApplication)
    .delete(protect, deleteJobApplication);

module.exports = router;