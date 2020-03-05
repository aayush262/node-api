const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env'});

const bootcamps = require('./routes/bootcamps');

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps',bootcamps);

const Port = process.env.PORT;

app.listen(Port,function(err,done){
    if(err){
        console.log(err);
    }else{
        console.log('Server started listening at port' ,Port);
    }
})