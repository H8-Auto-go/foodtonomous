module.exports = (err, req, res, next) => {
    console.log(err.name);
    if(err.code === 11000) {
        res.status(400).json({err: 'Email alraedy exist!'})
    }else if(err.name === 'customErr'){
        res.status(err.code).json({Error:err.msg})
    }else if(err.name === 'JsonWebTokenError') {
        res.status(400).json(err.message)
    }
    else{
        res.status(500).json({err:'Internal server error'})
    }
}