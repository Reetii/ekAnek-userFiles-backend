const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    description: {
        type: String,
    },
    fileBaseUrl:{
        type: String
    },
    path: {
        type: String,
    },
    shortenedUrl:{
        type:String,
    },
    uploadedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isActive:{
        type: Boolean,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('File', FileSchema);