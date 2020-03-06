const multer = require('multer');

const myStorage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,Date.now()+'-'+file.originalname);
    },
    destination: function(req,file,callback){
        callback(null, './public/images')
    }
})

const filter = (req,file,callback)=>{
    var mimetype = file.mimetype.split('/')[0];
    if(mimetype === 'image'){
        callback(null,true)
    }else{
        req.fileErr = true;
        callback(null,false)
    }
}

const upload = multer({
    storage: myStorage,
    fileFilter: filter
})
module.exports = upload