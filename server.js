const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');
const fileupload = require("express-fileupload");
dotenv.config({path : './config/config.env'});
connectDB();
const ErrorResponse = require("./utils/errorResponse");
const files = require("./routes/files");
const FileModel = require("./models/File");
const path = require("path");
const auth = require("./routes/auth");
const errorHandler = require("./middleware/error");
const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));

//Mounting routers
app.use('/api/v1/files', files);
app.use('/api/v1/auth',auth);

app.use(errorHandler);

app.get('/:shortUrl', async(req,res,next) => {
   const file = await FileModel.findOne({shortenedUrl : req.params.shortUrl});
   if(!file){
       return next(new ErrorResponse('File does not exist', 400));
   }
   res.redirect(file.path);

})
const PORT = process.env.port || 5000;
const server = app.listen(
    PORT,
    console.log(`Server runinng in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err,promise) => {
    console.log(`Error : ${err.message}`);
    server.close(() => {
        process.exit(1);
    })

})