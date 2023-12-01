const {response} = require('express');
const jwt = require('jsonwebtoken');

const ValidarJWT = (req, resp = response, next) =>{

    //leet el token
    const token = req.header('x-token');
    if(!token){
        resp.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        })
    }


    try {

        const {uid} = jwt.verify( token, process.env.JWTSECRET)
        req.uid = uid
        next()
        
    } catch (error) {
        console.log(error)
        return resp.status(401).json({
            ok:false,
            msg: 'Token no valido'
        })
    }

  
}

module.exports = {
    ValidarJWT
}