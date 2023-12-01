const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')
const { getCategoria, postCategoria, putCategoria, deleteCategoria} = require('../controllers/Categoria')

const router = Router()

router.get('/', ValidarJWT, getCategoria);

router.post('/',
[
    ValidarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
]
, postCategoria);

router.put('/:id',[
    ValidarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], putCategoria);

router.delete('/:id',ValidarJWT, deleteCategoria);

module.exports = router