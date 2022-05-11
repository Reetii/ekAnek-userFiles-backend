const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');
dotenv.config({path : './config/config.env'});
connectDB();
const files = require("./routes/files");
const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use('/api/v1/files', files);
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