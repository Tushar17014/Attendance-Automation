const studentRef = require('../models/studentData');
const teacherRef = require('../models/teacherData');
async function login(req, res) {
    const { username, password, type } = req.body;
    if(type == 1){
        if(username == 'admin' && password == 'admin'){
            res.status(200).json({ success: true, uid: username });
        }
        const data = await teacherRef.findOne({uid: username, password: password});
        if(!data){
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        else{
            res.status(200).json({ success: true, uid: username });
        }
    }
    else{
        try{
            const data = await studentRef.findOne({enroll: parseInt(username), password: password});
            if(!data){
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            else{
                res.status(200).json({ success: true, enroll: parseInt(username)});
            }
        }catch(err){
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    }
}

function logout(req, res) {
    req.session.destroy(() => {
        res.json({ success: true });
    });
}

module.exports = { login, logout };
