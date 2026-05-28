const Student = require('../models/studentSchema');
const Teacher = require('../models/teacherSchema');
const Sclass = require('../models/sclassSchema');


// 1️⃣ TOTAL REPORT
const getAdminReport = async (req, res) => {
    try {
        const adminId = req.params.id;

        const totalStudents = await Student.countDocuments({ school: adminId });
        const totalTeachers = await Teacher.countDocuments({ school: adminId });
        const totalClasses = await Sclass.countDocuments({ school: adminId });

        res.json({
            totalStudents,
            totalTeachers,
            totalClasses
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 2️⃣ DATE WISE ATTENDANCE
const getAttendanceByDate = async (req, res) => {
    try {
        const { date, adminId } = req.query;

        const selectedDate = new Date(date);

        const students = await Student.find({ school: adminId });

        let present = 0;
        let absent = 0;

        students.forEach(student => {
            student.attendance.forEach(att => {
                if (new Date(att.date).toDateString() === selectedDate.toDateString()) {
                    if (att.status === "Present") present++;
                    else absent++;
                }
            });
        });

        res.json({ present, absent });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 3️⃣ FEES REPORT
const getFeesReport = async (req, res) => {
    try {
        const { adminId } = req.query;

        const students = await Student.find({ school: adminId });

        let totalFees = 0;

        students.forEach(student => {
            totalFees += student.feesPaid || 0;
        });

        res.json({ totalFees });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdminReport,
    getAttendanceByDate,
    getFeesReport
};