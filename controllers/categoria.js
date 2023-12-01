const {response} = require('express')
const {Category } = require('../models/models')
const jwt = require('jsonwebtoken');

const getCategoria = async (req, resp = response ) => {
    try{
        
        const [categoria] = await Promise.all([
            Category.find()
        ])

        resp.json({
            ok: true,
            categoria
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

const postCategoria = async (req, resp = response ) => {
    try {
               const token = req.header('x-token');
               const decoded = jwt.verify(token, process.env.JWTSECRET);
               if(decoded.role != 'ADMIN'){
                   resp.status(401).json({
                       ok:false,
                       msg: 'No puedes realizar esta acción, no eres administrador'
                   })
               }
               const categoria = new Category(req.body)

               await categoria.save()

                 resp.json({
                   ok: true,
                   categoria
               })

           } catch (error) {

               console.log(error)

               resp.status(500).json({
                   ok:false,
                   msg:'Error inesperado... reivsar logs'
               })

           }
   }

   const putCategoria  = async (req, resp = response ) => {
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
        const CategoriaDb = await Category.findById(uid)

        if(!CategoriaDb){
            return resp.status(400).json({
                ok:false,
                msg:'Esta Categoria no existe'
            })
            }

        const categoria = await Category.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
            ok:true,
            categoria
            })  
       
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deleteCategoria = async( req, resp = response ) => {
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
    const CategoriaDB = await Category.findById(uid)

     //Verificacion de que ya exista el categoria
        if(!CategoriaDB){
            return resp.status(400).json({
                ok:false,
                msg:'Esta categoria no existe'
            })
            }

        //Eliminación
        const categoria = await Category.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'Categoria eliminada'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getCategoria, postCategoria, putCategoria, deleteCategoria}
