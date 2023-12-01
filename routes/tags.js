const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')
const  { getTag, postTag, putTag, deleteTag } = require('../controllers/tags')
const {Tag} = require('../models/models')

const router = Router()

router.get('/all', async (req, resp) => {
    
    const [tag] = await Promise.all([
        Tag.find()
    ])

    resp.render('pages/tags', {tag})
});


router.get('/', ValidarJWT, getTag);

router.post('/',
[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    validarCampos
]
, postTag);

router.put('/:id',[
    ValidarJWT,
    check('name','El nombre del estado es obligatorio').not().isEmpty(),
    validarCampos
], putTag);

router.delete('/:id',ValidarJWT, deleteTag);

module.exports = router