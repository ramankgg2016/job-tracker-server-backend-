// server/controllers/jobController.js
const JobApplication = require('../models/JobApplication');

// @desc    Get all job applications for a user
// @route   GET /api/jobs
// @access  Private
// const getJobApplications = async (req, res) => {
//     try {
//         const jobs = await JobApplication.find({ user: req.user.id }).sort({ createdAt: -1 }); //
//         res.json(jobs);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
const getJobApplications = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status = 'All', sort = 'newest' } = req.query;

        const query = { user: req.user.id };

        // Apply search filter
        if (search) {
            query.$or = [
                { company: { $regex: search, $options: 'i' } }, // Case-insensitive search
                { role: { $regex: search, $options: 'i' } }
            ];
        }

        // Apply status filter
        if (status !== 'All') {
            query.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalJobs = await JobApplication.countDocuments(query); // Count documents matching filters

        let sortOption = {};
        if (sort === 'newest') {
            sortOption = { createdAt: -1 }; // Or dateApplied: -1
        } else if (sort === 'oldest') {
            sortOption = { createdAt: 1 }; // Or dateApplied: 1
        }
        // Add more sorting options if needed (e.g., by company name)
        if (sort === 'companyAsc') {
            sortOption = { company: 1 };
        } else if (sort === 'companyDesc') {
            sortOption = { company: -1 };
        }


        const jobs = await JobApplication.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            jobs,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalJobs / parseInt(limit)),
            totalJobs,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get a single job application by ID
// @route   GET /api/jobs/:id
// @access  Private
const getJobApplicationById = async (req, res) => {
    try {
        const job = await JobApplication.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        // Ensure user owns the job application
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.json(job);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a new job application
// @route   POST /api/jobs 
// @access  Private
const createJobApplication = async (req, res) => {
    const { company, role, dateApplied, status, notes } = req.body;

    // Basic validation
    if (!company || !role || !dateApplied || !status) {
        return res.status(400).json({ message: 'Please include company, role, date applied, and status' });
    }

    try {
        const newJob = new JobApplication({
            user: req.user.id,
            company,
            role,
            dateApplied,
            status,
            notes,
        });

        const job = await newJob.save();
        res.status(201).json(job);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a job application
// @route   PUT /api/jobs/:id 
// @access  Private
const updateJobApplication = async (req, res) => {
    const { company, role, dateApplied, status, notes } = req.body;

    try {
        let job = await JobApplication.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        // Ensure user owns the job application
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        job.company = company || job.company;
        job.role = role || job.role;
        job.dateApplied = dateApplied || job.dateApplied;
        job.status = status || job.status;
        job.notes = notes || job.notes;

        job = await job.save();
        res.json(job);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a job application
// @route   DELETE /api/jobs/:id 
// @access  Private
const deleteJobApplication = async (req, res) => {
    try {
        const job = await JobApplication.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        // Ensure user owns the job application
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await JobApplication.deleteOne({ _id: req.params.id }); // Mongoose 6+ way
        res.json({ message: 'Job application removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getJobApplications,
    getJobApplicationById,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication,
};