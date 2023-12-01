const {response} = require('express')
const {Status} = require('../models/models')
const jwt = require('jsonwebtoken');

const getEstado= async (req, resp = response ) => {
    try{
        
        const [estado] = await Promise.all([
            Status.find()
        ])

        resp.json({
            ok: true,
            estado
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

const postEstado = async (req, resp = response ) => {
    try {
               const token = req.header('x-token');
               const decoded = jwt.verify(token, process.env.JWTSECRET);
               if(decoded.role != 'ADMIN'){
                   resp.status(401).json({
                       ok:false,
                       msg: 'No puedes realizar esta acción, no eres administrador'
                   })
               }
               const estado = new Status(req.body)

               estado.author = decoded.uid

               await estado.save()

                 resp.json({
                   ok: true,
                   estado
               })

           } catch (error) {

               console.log(error)

               resp.status(500).json({
                   ok:false,
                   msg:'Error inesperado... reivsar logs'
               })

           }
   }

   const putEstado = async (req, resp = response ) => {
    const uid = req.params.id
    try {
        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'ADMIN'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres administrador'
            })
        }
        const estadoDb = await Status.findById(uid)

        if(!estadoDb){
            return resp.status(400).json({
                ok:false,
                msg:'Este estado no existe'
            })
            }

        const estado = await Status.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
            ok:true,
            estado
            })  
       
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deleteEstado = async( req, resp = response ) => {
    const uid = req.params.id
    try {
        const token = req.header('x-token');
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if(decoded.role != 'ADMIN'){
            resp.status(401).json({
                ok:false,
                msg: 'No puedes realizar esta acción, no eres administrador'
            })
        }
    const estadoDB = await Status.findById(uid)

     //Verificacion de que ya exista el estado
        if(!estadoDB){
            return resp.status(400).json({
                ok:false,
                msg:'Este estado no existe'
            })
            }

        //Eliminación
        const estado = await Status.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'estado eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getEstado, postEstado, putEstado, deleteEstado}
