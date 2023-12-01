const {response} = require('express')
const {Comment } = require('../models/models')
const jwt = require('jsonwebtoken');

const getComentario = async (req, resp = response ) => {
    try{
        
        const [comentario] = await Promise.all([
            Comment.find()
        ])

        resp.json({
            ok: true,
            comentario
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

const postComentario = async (req, resp = response ) => {
    try {
               const token = req.header('x-token');
               const decoded = jwt.verify(token, process.env.JWTSECRET);
               if(decoded.role != 'ADMIN'){
                   resp.status(401).json({
                       ok:false,
                       msg: 'No puedes realizar esta acción, no eres administrador'
                   })
               }
               const comentario = new Comment(req.body)

               comentario.author = decoded.uid

               await comentario.save()

                 resp.json({
                   ok: true,
                   comentario
               })

           } catch (error) {

               console.log(error)

               resp.status(500).json({
                   ok:false,
                   msg:'Error inesperado... reivsar logs'
               })

           }
   }

   const putComentario  = async (req, resp = response ) => {
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
        const comentarioDb = await Comment.findById(uid)

        if(!comentarioDb){
            return resp.status(400).json({
                ok:false,
                msg:'Esta comentario no existe'
            })
            }

        const comentario = await Comment.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
            ok:true,
            comentario
            })  
       
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deleteComentario = async( req, resp = response ) => {
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
    const comentarioDB = await Comment.findById(uid)

     //Verificacion de que ya exista el comentario
        if(!comentarioDB){
            return resp.status(400).json({
                ok:false,
                msg:'Esta comentario no existe'
            })
            }

        //Eliminación
        const comentario = await Comment.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'comentario eliminada'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getComentario, postComentario, putComentario, deleteComentario}
