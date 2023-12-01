const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')
const  { getProyecto, postProyecto, putProyecto, deleteProyecto} = require('../controllers/projecto')

const router = Router()

router.get('/', ValidarJWT, getProyecto);

router.post('/',
[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    check('description','La descripcion del estado es obligatorio').not().isEmpty(),
    validarCampos
]
, postProyecto);

router.put('/:id',[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    check('description','La descripcion del estado es obligatorio').not().isEmpty(),
    validarCampos
], putProyecto);

router.delete('/:id',ValidarJWT, deleteProyecto);

module.exports = router