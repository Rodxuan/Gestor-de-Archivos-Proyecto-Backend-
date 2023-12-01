const {response} = require('express')
const {Project} = require('../models/models')
const jwt = require('jsonwebtoken');

const getProyecto = async (req, resp = response ) => {
    try{
        
        const [projecto] = await Promise.all([
            Project.find()
        ])

        resp.json({
            ok: true,
            projecto
        })

    }catch (error) {

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

const postProyecto = async (req, resp = response ) => {
    try {
               const token = req.header('x-token');
               const decoded = jwt.verify(token, process.env.JWTSECRET);
               if(decoded.role != 'ADMIN'){
                   resp.status(401).json({
                       ok:false,
                       msg: 'No puedes realizar esta acción, no eres administrador'
                   })
               }
               const projecto = new Project(req.body)

               projecto.author = decoded.uid

               await projecto.save()

                 resp.json({
                   ok: true,
                   projecto
               })

           } catch (error) {

               console.log(error)

               resp.status(500).json({
                   ok:false,
                   msg:'Error inesperado... reivsar logs'
               })

           }
   }

   const putProyecto = async (req, resp = response ) => {
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
        const projectoDb = await Project.findById(uid)

        if(!projectoDb){
            return resp.status(400).json({
                ok:false,
                msg:'Este projecto no existe'
            })
            }

        const projecto = await Project.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
            ok:true,
            projecto
            })  
       
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deleteProyecto = async( req, resp = response ) => {
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
    const projectoDB = await Project.findById(uid)

     //Verificacion de que ya exista el projecto
        if(!projectoDB){
            return resp.status(400).json({
                ok:false,
                msg:'Este projecto no existe'
            })
            }

        //Eliminación
        const projecto = await Project.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'projecto eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getProyecto, postProyecto, putProyecto, deleteProyecto}
