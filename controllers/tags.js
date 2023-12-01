const {response} = require('express')
const {Tag} = require('../models/models')
const jwt = require('jsonwebtoken');

const getTag= async (req, resp = response ) => {
    try{
        
        const [tag] = await Promise.all([
            Tag.find()
        ])

        resp.json({
            ok: true,
            tag
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

const postTag = async (req, resp = response ) => {
    try {
               const token = req.header('x-token');
               const decoded = jwt.verify(token, process.env.JWTSECRET);
               if(decoded.role != 'ADMIN'){
                   resp.status(401).json({
                       ok:false,
                       msg: 'No puedes realizar esta acción, no eres administrador'
                   })
               }
               const tag = new Tag(req.body)

               tag.author = decoded.uid

               await tag.save()

                 resp.json({
                   ok: true,
                   tag
               })

           } catch (error) {

               console.log(error)

               resp.status(500).json({
                   ok:false,
                   msg:'Error inesperado... reivsar logs'
               })

           }
   }

   const putTag = async (req, resp = response ) => {
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
        const tagDb = await Tag.findById(uid)

        if(!tagDb){
            return resp.status(400).json({
                ok:false,
                msg:'Este tag no existe'
            })
            }

        const tag = await Tag.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
            ok:true,
            tag
            })  
       
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deleteTag = async( req, resp = response ) => {
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
    const tagDB = await Tag.findById(uid)

     //Verificacion de que ya exista el tag
        if(!tagDB){
            return resp.status(400).json({
                ok:false,
                msg:'Este tag no existe'
            })
            }

        //Eliminación
        const tag = await Tag.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'tag eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getTag, postTag, putTag, deleteTag}
