const {Router} = require('express')
const {check} = require('express-validator')
const {getUsuarios, newUsuario, actualizarUsuarios, eliminarUsuario}= require('../controllers/usuario')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')



const router = Router()

router.get('/', ValidarJWT, getUsuarios);

router.post('/',
[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
]
, newUsuario);

router.put('/:id',[
    ValidarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuarios);

router.delete('/:id',ValidarJWT, eliminarUsuario);

module.exports = router