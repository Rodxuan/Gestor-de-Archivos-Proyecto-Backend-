const Usuario = require('../models/usuario');
const {response} =require('express')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')

const getUsuarios = async(req, resp)=>{
    const [usuarios] =  await Promise.all([
    Usuario.find()
    ])

    resp.json({
        ok: true,
        usuarios
    })
}

const newUsuario = async (req, resp = response)=>{
    const {email, password, nombre} = req.body
    


    try {
        const existEmail = await Usuario.findOne({email})
   
    if(existEmail){
    
            resp.status(400).json({
            ok:false,
            msg:'El correo ya esta registrado'
    
        })
    }   

    const usuario = new Usuario(req.body)

    //Encriptar contraseña

    const salt = bcrypt.genSaltSync()

    usuario.password = bcrypt.hashSync(password, salt)


    //Guardar usuario
    await usuario.save()

    //Generar JWT
    const token = await generarJWT(usuario._id, usuario.role)


    resp.json({
        ok: true,
        usuario,
        token
    })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const actualizarUsuarios = async( req, resp) => {
        
    const uid = req.params.id
    const {nombre, role, email} = req.body

    try {
    const usuarioDB = await Usuario.findById(uid)

    if(!usuarioDB){
      return  resp.status(404).json({
            ok:false,
            msg:'No existe un usuario por ese id'
        })
    }

    //Actualizaciones
    const {password, google, email, ...campos} = req.body


    if(usuarioDB.email !== email){

        const existEmail= await Usuario.findOne({email})
        if(existEmail){
            resp.status(400).json({
                ok:false,
                msg:'Ya existe un usuario con ese email'
            })
        }
    }

    campos.email = email

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

        resp.json({
        ok:true,
        usuario:usuarioActualizado
        })  


        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:"Error inesperado"
        })
    }
}

const eliminarUsuario = async(req, resp = response)=> {
    const uid = req.params.id

    try {

        const usuarioDB = await Usuario.findById(uid)
        
        if(!usuarioDB){
            return  resp.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid)

        resp.json({
            ok:true,
            msg: 'Usuario eliminado'
            })  

        
    } catch (error) {
        resp.json({
            ok:true,
            msg: 'Hable con el usuario'
            })      
    }
    
    
}

module.exports = {getUsuarios, newUsuario, actualizarUsuarios, eliminarUsuario}