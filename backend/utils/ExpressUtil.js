const Respond = ({res, status, data}) => {
    if(status == 200 || status == 201){
        return res.status(status).json(data);
    }
    return res.status(status).json(data);
}

module.exports = {Respond};