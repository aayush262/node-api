module.exports = function(fn){
    return function(req,res,next){
        Promise
            .resolve(fn(req,res,next))
            .catch(next)
    }
}

/* asyncHandler = ( fn )=> {
        return (req,res,next)=>{
            Promise
                .resolve(fn(req,res,next))
                .catch(next)
        }
    }
*/
/* notes
    takes a function as an argument and returns a function
    with three input parameters which is basically a middleware
    catches any incoming erros and passes it to express js and
    runs our error Handling middleware
    (in short avoiding repitition of try catch blocks we use this function) 
*/