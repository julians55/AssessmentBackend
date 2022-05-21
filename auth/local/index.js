
const { Router } = require('express');

const router = Router();

const { handlerUserLogin } = require('./local.controller');

router.post('/login', handlerUserLogin);

module.exports = router;