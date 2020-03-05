const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env'});

const bootcamps = require('./routes/bootcamps');

require('./db');

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps',bootcamps);

const port = process.env.PORT;

app.listen(port,function(err,done){
    if(err){
        console.log(err);
    }else{
        console.log('Server started listening at port' ,port);
    }
})