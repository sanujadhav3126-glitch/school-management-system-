const express = require("express");
const router = express.Router();
const Student = require("../models/studentSchema");

// Date wise student report
router.get("/students-by-date", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const students = await Student.find(filter);

    res.json(students);

  } catch (error) {
    res.status(500).json({ message: "Error fetching report" });
  }
});

module.exports = router;