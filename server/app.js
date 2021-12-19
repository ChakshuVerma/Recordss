const dotenv = require('dotenv');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;

// Database Connection
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection Successful');
}).catch((err) => {
    console.log(err);
});

// app.use(bodyParser({limit: '50mb'}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
// Router
app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.listen(PORT,() => console.log(`Server started at ${PORT}`));