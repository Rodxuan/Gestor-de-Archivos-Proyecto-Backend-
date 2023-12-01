const {Router} = require('express')
const {check} = require('express-validator')
const { getComentario, postComentario, putComentario, deleteComentario}= require('../controllers/comentario')
const {validarCampos}= require('../middlewares/validar-campos')
const { ValidarJWT } = require('../middlewares/validar-jsw')
const {Comment } = require('../models/models')


const router = Router()

router.get('/all', async (req, resp) => {
    
    const [comentario] = await Promise.all([
        Comment.find()
    ])

    resp.render('pages/index', {comentario})
});


router.get('/', ValidarJWT, getComentario);

router.post('/',
[
    ValidarJWT,
    check('text','El comentario es obligatorio').not().isEmpty(),
    validarCampos
]
, postComentario);

router.put('/:id',[
    ValidarJWT,
    check('text','El comentario es obligatorio').not().isEmpty(),
    validarCampos
], putComentario);

router.delete('/:id',ValidarJWT, deleteComentario);

module.exports = router