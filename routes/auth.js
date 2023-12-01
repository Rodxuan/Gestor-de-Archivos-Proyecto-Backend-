const {Router} = require('express')
const { check } = require('express-validator')
const { login,  } = require('../controllers/auth')
const {validarCampos}= require('../middlewares/validar-campos')

const router = Router()

router.post('/', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','Debe ser un email valido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login)

module.exports = router