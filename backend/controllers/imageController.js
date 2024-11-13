const asyncHandler = require('express-async-handler');
const uploadImage = asyncHandler(async (req, res) => {
    try{
        if(req?.files?.length){
            console.log(req.files);
            let uploadedFiles = req?.files?.map((image) => {
                return {img: image.filename}
            })
        }
    }
})