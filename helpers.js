
const imageFilter = function(req, file, cb) {
    // Accept images only
    console.log("in helper.js");
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }else{
        console.log("true");
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;