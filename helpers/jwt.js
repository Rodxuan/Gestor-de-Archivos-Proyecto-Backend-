const jwt = require('jsonwebtoken');

const generarJWT = ( uid, role ) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            role
        }
    
        jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: '12h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar correctamente')
            }

            resolve(token)
        })
    })
}

module.exports={
    generarJWT
}