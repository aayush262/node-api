const mongoose = require('mongoose');

const connectDB = async()=>{
   try{
    await mongoose.connect(`${process.env.CONXN_URL}/${process.env.DB_NAME}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('database connection success');
   }
   catch(error){
       console.log(err);
   }
}
connectDB();