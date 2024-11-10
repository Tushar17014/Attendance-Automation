const User = require('../models/studentData');
const {Respond} = require('../utils/ExpressUtil');

async function test(req, res, next){
    try {
        const users = await User.find();
        return Respond({
            res,
            status: 200,
            data: users
        });
    } catch (error) {
        console.log(error)
    }
    // const user = new User({
    //     uid:"Teach1",
    //     password:"teach@123",
    //     name:"Nikhil Gupta",
    //     courses: [
    //         {courseName: "Machine Learning", courseID: "ML01", batch: ["B1", "B2", "B3"]},
    //         {courseName: "Deep Learning", courseID: "DL01", batch: ["B1", "B2", "B3"]},
    //         {courseName: "Soft Computing", courseID: "SC01", batch: ["B4", "B5", "B6"]},
    //     ]
    // })
    // const data = await user.save();
    // res.send(data);
}

module.exports = {test};