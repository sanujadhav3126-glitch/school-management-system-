const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');


// ---------------- ADMIN REGISTER ----------------

const adminRegister = async (req, res) => {
    try {

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            return res.send({ message: 'Email already exists' });
        }

        if (existingSchool) {
            return res.send({ message: 'School name already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const admin = new Admin({
            ...req.body,
            password: hashedPass
        });

        let result = await admin.save();

        result.password = undefined;

        res.send(result);

    } catch (err) {
        res.status(500).json(err);
    }
};


// ---------------- ADMIN LOGIN ----------------

const adminLogIn = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({ message: "Email and password are required" });
        }

        let admin = await Admin.findOne({ email: email });

        if (!admin) {
            return res.send({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return res.send({ message: "Invalid password" });
        }

        admin.password = undefined;

        res.send(admin);

    } catch (err) {
        res.status(500).json(err);
    }
};


// ---------------- GET ADMIN DETAIL ----------------

const getAdminDetail = async (req, res) => {
    try {

        let admin = await Admin.findById(req.params.id);

        if (!admin) {
            return res.send({ message: "No admin found" });
        }

        admin.password = undefined;

        res.send(admin);

    } catch (err) {
        res.status(500).json(err);
    }
};


// ---------------- DELETE ADMIN ----------------

const deleteAdmin = async (req, res) => {
    try {

        const result = await Admin.findByIdAndDelete(req.params.id);

        await Sclass.deleteMany({ school: req.params.id });
        await Student.deleteMany({ school: req.params.id });
        await Teacher.deleteMany({ school: req.params.id });
        await Subject.deleteMany({ school: req.params.id });
        await Notice.deleteMany({ school: req.params.id });
        await Complain.deleteMany({ school: req.params.id });

        res.send(result);

    } catch (err) {
        res.status(500).json(err);
    }
};


// ---------------- UPDATE ADMIN ----------------

const updateAdmin = async (req, res) => {
    try {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        let result = await Admin.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        result.password = undefined;

        res.send(result);

    } catch (err) {
        res.status(500).json(err);
    }
};


// ---------------- EXPORT ----------------

module.exports = {
    adminRegister,
    adminLogIn,
    getAdminDetail,
    deleteAdmin,
    updateAdmin
};