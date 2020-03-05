const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');

dotenv.config({ path: './config/config.env'});

const bootcamps = require('./routes/bootcamps');

require('./db');

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps',bootcamps);
app.use((req,res,next)=>{
    next('page not found');
})
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port,function(err,done){
    if(err){
        console.log(err);
    }else{
        console.log('Server started listening at port' ,port);
    }
})  