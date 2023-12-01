const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')
const { getEstado, postEstado, putEstado, deleteEstado} = require('../controllers/estado')



const router = Router()

router.get('/', ValidarJWT, getEstado);

router.post('/',
[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    validarCampos
]
, postEstado);

router.put('/:id',[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    validarCampos
], putEstado);

router.delete('/:id',ValidarJWT, deleteEstado);

module.exports = router