module.exports = (req, res, next) => {
    try{
        const {user} = req
        if(user.role === 'driver') {
            next()
        }else {
            throw{name: 'customErr', code:401, msg:'you no have accsess'}
        }
    }catch(err) {
        next(err)
    }
}