const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env'});

const bootcamps = require('./routes/bootcamps');

const app = express();

app.use('/api/v1/bootcamps',bootcamps);

const Port = process.env.PORT;

app.listen(Port,function(err,done){
    if(err){
        console.log(err);
    }else{
        console.log('Server started listening at port' ,Port);
    }
})