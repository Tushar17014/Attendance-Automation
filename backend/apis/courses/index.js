const { Respond } = require('../../utils/ExpressUtil');
const courseRef = require('../../models/courses')

async function getAllCourses(req, res, next){
    try{
        const data = await courseRef.find().lean();
        return Respond({
            res,
            status: 200,
            data: data
        });
    }catch(err){
        console.error(err.message);
    }
}

async function getCourseByID(req, res, next){
    try{
        const data = await courseRef.findOne({cid: req.query.cid}).lean();
        return Respond({
            res,
            status: 200,
            data: data
        })
    }catch(err){
        console.error(err.message);
    }
}

async function getCourseByArrayID(req, res, next){
    try{
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
    }catch(err){
        console.error(err.message);
    }
}

module.exports = {getAllCourses, getCourseByID, getCourseByArrayID};