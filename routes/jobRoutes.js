// server/routes/jobRoutes.js
const express = require('express');
const {
    getJobApplications,
    getJobApplicationById,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication,
} = require('../controllers/jobController');

const updateJobApllicationStatus = require("../controllers/statusUpdate")
const { protect } = require('../middleware/authMiddleware');
const { jobValidationRules } = require('../validation/jobValidation');
const router = express.Router();

router.route('/')
    .get(protect, getJobApplications)
    .post(protect, jobValidationRules, createJobApplication);

router.route('/:id')
    .get(protect, getJobApplicationById)
    .put(protect, updateJobApplication)
    .delete(protect, deleteJobApplication);


router.route('/status/:id')
    .get(protect, getJobApplicationById)
    .patch(protect, jobValidationRules, updateJobApllicationStatus)
    .delete(protect, deleteJobApplication);

module.exports = router;