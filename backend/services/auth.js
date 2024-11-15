const jwt = require('jsonwebtoken');
const secret = "MySecret"

function setUser(username){
    const token = jwt.sign({
        id: username
    }, secret, {expiresIn: '1h'});
    return token;
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {setUser, getUser}