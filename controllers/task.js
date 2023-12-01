const {response} = require('express')
const { Task,
    Category,
    Comment,
    Status,
    Priority,
    Tag,
    Project} = require('../models/models')
const jwt = require('jsonwebtoken');

const getTask= async (req, resp = response ) => {
    try{
        
        const [task] = await Promise.all([
            Task.find()
        ])

        
        await Promise.all(task.map(async (task) => {

            let categoria 
            let comentario
            let estado
            let prioridad
            let tag
            let proyecto
          
            await Promise.all([
               categoria = await Category.findById(task.category),
               comentario = await Comment.findById(task.comments),
               estado = await Status.findById(task.status),
               prioridad  = await Priority.findById(task.priority),
               tag = await Tag.findById(task.tags),
               proyecto  = await Project.findById(task.project)
          ])

          task.category = categoria.name,
          task.comments = comentario.text,
          task.status = estado.name,
          task.priority = prioridad.name,
          task.tags = tag.name
          task.project = proyecto.name
          }))
          
        resp.json({
            ok: true,
            task
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

const postTask = async (req, resp = response ) => {
    try {
               const token = req.header('x-token');
               const decoded = jwt.verify(token, process.env.JWTSECRET);
               if(decoded.role != 'ADMIN'){
                   resp.status(401).json({
                       ok:false,
                       msg: 'No puedes realizar esta acción, no eres administrador'
                   })
               }
               const task = new Task(req.body)

               task.author = decoded.uid

               await task.save()

                 resp.json({
                   ok: true,
                   task
               })

           } catch (error) {

               console.log(error)

               resp.status(500).json({
                   ok:false,
                   msg:'Error inesperado... reivsar logs'
               })

           }
   }

   const putTask = async (req, resp = response ) => {
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
        const taskDb = await Task.findById(uid)

        if(!taskDb){
            return resp.status(400).json({
                ok:false,
                msg:'Este task no existe'
            })
            }

        const task = await Task.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
            ok:true,
            task
            })  
       
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deleteTask = async( req, resp = response ) => {
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
    const taskDB = await Task.findById(uid)

     //Verificacion de que ya exista el task
        if(!taskDB){
            return resp.status(400).json({
                ok:false,
                msg:'Este task no existe'
            })
            }

        //Eliminación
        const task = await Task.findByIdAndDelete(uid)

            resp.json({
            ok:true,
            msg: 'task eliminado'
            })  
            
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                ok:'false',
                msg:'Error inesperado... reivsar logs'
            })
        }
}

module.exports = { getTask, postTask, putTask, deleteTask}
