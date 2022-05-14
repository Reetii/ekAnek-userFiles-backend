const express = require("express");
const router = express.Router();
const {addFile,uploadFile, getFilesUploadedByAUser, getFileDetails, deleteFile} = require("../controllers/files")
const {protect} = require("../middleware/auth")
router.route('/').get(protect, getFilesUploadedByAUser).post(protect,addFile);
router.route('/:fileId').get(protect,getFileDetails).delete(protect, deleteFile);
router.route('/:fileId/upload').put(protect,uploadFile);

module.exports = router;