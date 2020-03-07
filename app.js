const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const apiRoutes = require('./api_route');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');

dotenv.config({ path: './config/config.env'});

require('./db');

const app = express();

app.set('view engine', ejs);
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());
app.use(cookieParser());

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