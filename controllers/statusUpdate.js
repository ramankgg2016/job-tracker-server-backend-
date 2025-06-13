// controllers/jobApplicationController.js
const JobApplication = require("../models/JobApplication");

// Update the status of a job application by ID
const updateJobApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status field is required." });
        }

        const updatedApplication = await JobApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ error: "Job application not found." });
        }

        console.log(`Job application status updated: ${id} -> ${status}`);
        return res.status(200).json({ success: true, data: updatedApplication });

    } catch (error) {
        console.error("Error updating job application status:", error);
        return res.status(500).json({ error: "Server error while updating status." });
    }
};

module.exports = updateJobApplicationStatus;
