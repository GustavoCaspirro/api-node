const jwt = require('jsonwebtoken');
const config = require('../config/default');


module.exports = (request, response, next) =>{
    const token = request.headers['x-access-token'];
    console.log(request.headers);
    
    if(!token){
        response
            .status(401)
            .send({
                code: 'not_authorized',
                message: 'Not authorized'
            });
    }
    
    jwt.verify(token, config.secret, (error, decoded) => {
        if (error){
            return response
                .status(500)
                .send({error});
        }

        console.log(decoded);

    })
    
    next();
}