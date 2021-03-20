module.exports = (err, req, res, next) => {
    console.log(err.name);
    if(err.name === 'SequelizeUniqueConstraintError'){
        return res.status(400).json({error: 'Email already exist'})
     } else if(err.name == "SequelizeValidationError"){
         const errors = err.errors.map(e => e.message)
        return res.status(400).json({errors: errors}) 
     }else if(err.name == 'customError'){
        return res.status(err.code).json({err: err.msg})
     }else if(err.name == 'JsonWebTokenError'){
        return res.status(401).json({err: 'Invalid token'}) 
     }else{
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'})
     }
}