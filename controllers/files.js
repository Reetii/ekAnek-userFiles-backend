//@desc: GET all files
//@route : GET /api/v1/files
exports.getFiles = (req,res,next) => {
    res.status(200).send({'status' : 'Success', 'hello': req.hello});
}
