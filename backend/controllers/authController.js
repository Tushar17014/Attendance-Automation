const studentRef = require('../models/studentData');
const teacherRef = require('../models/teacherData');
async function login(req, res) {
    const { username, password, type } = req.body;
    if(type == 1){
        if(username == 'admin' && password == 'admin'){
            res.status(200).json({ success: true, uid: username, type: 1 });
            return ;
        }
        const data = await teacherRef.findOne({uid: username, password: password});
        if(!data){
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return ;
        }
        else{
            res.status(200).json({ success: true, uid: username });
            return ;
        }
    }
    else{
        try{
            const data = await studentRef.findOne({enroll: parseInt(username), password: password});
            if(!data){
                res.status(401).json({ success: false, message: 'Invalid credentials' });
                return ;
            }
            else{
                res.status(200).json({ success: true, enroll: parseInt(username)});
                return ;
            }
        }catch(err){
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    }
}


module.exports = { login };
