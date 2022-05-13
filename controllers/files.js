const ErrorResponse = require("../utils/errorResponse");
const File = require("../models/File");
const path = require("path");
const shortid = require("shortid");
/**
 *
 * @desc Get Files
 * @route GET /api/v1/files
 * @access private
 */
exports.getFilesUploadedByAUser = async (req,res,next) => {
    try{
        let userId = req.user._id;
        const files = await File.find({uploadedBy: userId});
        res.status(200).send({success: true, data : files});

    }
    catch(err){
        return next(new ErrorResponse(err, 400));

    }
}

/**
 *
 * @desc Get a File by Id
 * @route GET /api/v1/file/:fileId
 * @access private
 */
exports.getFileDetails = async (req,res,next) => {
    try{
        let {fileId} = req.params;
        const file = await File.findOne({_id: fileId});
        res.status(200).send({success: true, data : file});


    }
    catch(err){
        return next(new ErrorResponse(err, 400));

    }
}


/**
 *
 * @desc Add File
 * @route POST /api/v1/files
 * @access private
 */
exports.addFile = async (req,res,next) => {
    try{
        req.body.uploadedBy = req.user._id;
        if(!req.body.name){
            return next(new ErrorResponse('A file name is required', 400));
        }
        const file = await File.create(req.body);
        res.status(200).send({success: true, file : file});

    }
    catch(err){
        return next(new ErrorResponse(err, 400));

    }
}

/**
 *
 * @desc Upload File
 * @route PUT /api/v1/file/:fileId/upload
 * @access private
 */
exports.uploadFile = async (req,res,next) => {
    try{
        let {fileId} = req.params;
        const file = await File.findOne({_id: fileId});
        if(!file){
            return next(new ErrorResponse('File does not exist', 400));
        }
        if(!req.files){
            return next(new ErrorResponse('Please upload a file', 400));
        }
        const fileUploaded = req.files.file;
        fileUploaded.name = `${file.name}${path.parse(fileUploaded.name).ext}`
        fileUploaded.mv(`${process.env.FILE_UPLOAD_PATH}/${fileUploaded.name}`, async err => {
            if(err){
                console.error(err);
                return next(new ErrorResponse(`Problem with file upload`, 500));
            }
            await File.findOneAndUpdate({_id:fileId}, {fileBaseUrl:req.headers.host, path :`${process.env.FILE_PATH}/${fileUploaded.name}`, shortenedUrl: shortid.generate()});
            res.status(200).json({
                success: true,
                data: fileUploaded.name
            });
        })


    }
    catch(err){
        return next(new ErrorResponse(err, 400));

    }
}
