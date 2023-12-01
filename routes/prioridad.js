const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')
const  { getPrioridad, postPrioridad, putPrioridad, deletePrioridad} = require('../controllers/prioridad')

const router = Router()

router.get('/', ValidarJWT, getPrioridad);

router.post('/',
[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    validarCampos
]
, postPrioridad);

router.put('/:id',[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    validarCampos
], putPrioridad);

router.delete('/:id',ValidarJWT, deletePrioridad);

module.exports = router