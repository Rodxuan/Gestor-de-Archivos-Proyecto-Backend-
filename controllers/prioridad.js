const {response} = require('express')
const {Priority} = require('../models/models')
const jwt = require('jsonwebtoken');

const getPrioridad= async (req, resp = response ) => {
    try{
        
        const [prioridad] = await Promise.all([
            Priority.find()
        ])

        resp.json({
            ok: true,
            prioridad
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

const postPrioridad = async (req, resp = response ) => {
    try {
               const token = req.header('x-token');
               const decoded = jwt.verify(token, process.env.JWTSECRET);
               if(decoded.role != 'ADMIN'){
                   resp.status(401).json({
                       ok:false,
                       msg: 'No puedes realizar esta acción, no eres administrador'
                   })
               }
               const prioridad = new Priority(req.body)

               prioridad.author = decoded.uid

               await prioridad.save()

                 resp.json({
                   ok: true,
                   prioridad
               })

           } catch (error) {

               console.log(error)

               resp.status(500).json({
                   ok:false,
                   msg:'Error inesperado... reivsar logs'
               })

           }
   }

   const putPrioridad = async (req, resp = response ) => {
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
        const prioridadDb = await Priority.findById(uid)

        if(!prioridadDb){
            return resp.status(400).json({
                ok:false,
                msg:'Este prioridad no existe'
            })
            }

        const prioridad = await Priority.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
            ok:true,
            prioridad
            })  
       
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deletePrioridad = async( req, resp = response ) => {
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
    const prioridadDB = await Priority.findById(uid)

     //Verificacion de que ya exista el prioridad
        if(!prioridadDB){
            return resp.status(400).json({
                ok:false,
                msg:'Este prioridad no existe'
            })
            }

        //Eliminación
        const prioridad = await Priority.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'prioridad eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getPrioridad, postPrioridad, putPrioridad, deletePrioridad}
