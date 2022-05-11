const express = require("express");
const router = express.Router();
const {getFiles} = require("../controllers/files")
router.route('/').get(getFiles);

module.exports = router;