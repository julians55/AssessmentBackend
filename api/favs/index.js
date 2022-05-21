const { Router } = require('express');
const { isAuth } = require('../../auth/auth.service');
const {
    handlerAllFavs,
    handlerOneFav,
    handlerCreateFav,
    handlerUpdateFav,
    handlerDeleteFav,
} = require('../favs/favs.controller');

const router = Router();

router.get('/', isAuth(), handlerAllFavs);
router.get('/:id', isAuth(), handlerOneFav);
router.post('/',  isAuth(), handlerCreateFav);
router.patch('/:id', isAuth(), handlerUpdateFav);
router.delete('/:id', isAuth(),  handlerDeleteFav);

module.exports = router;