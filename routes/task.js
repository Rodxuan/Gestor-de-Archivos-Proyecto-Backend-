const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')
const  { getTask, postTask, putTask, deleteTask} = require('../controllers/task')

const router = Router()

router.get('/', ValidarJWT, getTask);

router.post('/',
[
    ValidarJWT,
    check('title','El nombre es obligatorio').not().isEmpty(),
    check('description','La descripción  es obligatorio').not().isEmpty(),
    check('category','La categoria  es obligatorio').not().isEmpty(),
    check('status','El estado es obligatorio').not().isEmpty(),
    check('priority','La prioridad es obligatorio').not().isEmpty(),
    check('tags','Los tags son obligatorio').not().isEmpty(),
    check('project','El proyecto es obligatorio').not().isEmpty(),
    validarCampos
]
, postTask);

router.put('/:id',[
    ValidarJWT,
    check('title','El nombre es obligatorio').not().isEmpty(),
    check('description','La descripción  es obligatorio').not().isEmpty(),
    check('category','La categoria  es obligatorio').not().isEmpty(),
    check('status','El estado es obligatorio').not().isEmpty(),
    check('priority','La prioridad es obligatorio').not().isEmpty(),
    check('tags','Los tags son obligatorio').not().isEmpty(),
    check('project','El proyecto es obligatorio').not().isEmpty(),
    validarCampos
], putTask);

router.delete('/:id',ValidarJWT, deleteTask);

module.exports = router