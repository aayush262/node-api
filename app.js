const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const apiRoutes = require('./api_route');

dotenv.config({ path: './config/config.env'});

require('./db');

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api',apiRoutes);
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