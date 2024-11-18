const { Respond } = require('../../utils/ExpressUtil');
const courseRef = require('../../models/courses')

async function getAllCourses(req, res, next) {
    try {
        const data = await courseRef.find().lean();
        return Respond({
            res,
            status: 200,
            data: data
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function getCourseByID(req, res, next) {
    try {
        const data = await courseRef.findOne({ cid: req.query.cid }).lean();
        return Respond({
            res,
            status: 200,
            data: data
        })
    } catch (err) {
        console.error(err.message);
    }
}

async function getCourseByArrayID(req, res, next) {
    try {
        let cids = req.query.cids;
        if (typeof cids === 'string') {
            cids = cids.split(',').map(id => id.trim());
        }
        const data = await courseRef.find({ cid: { $in: cids } }).lean();
        return Respond({
            res,
            status: 200,
            data: data
        })
    } catch (err) {
        console.error(err.message);
    }
}

async function addCourse(req, res) {
    try {
        const { cid, name, department } = req.body;

        const rec = new courseRef({ cid: cid, name: name, department: department, teacher: "Teach1", studentcount: 0, credit: 3})
        const data = await rec.save();
        return Respond({
            res,
            status: 200,
            data: data
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error Adding Course');
    }
}

module.exports = { getAllCourses, getCourseByID, getCourseByArrayID, addCourse };