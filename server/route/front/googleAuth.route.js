const router = require('express').Router();
const { googleLogin } = require('../../controller/front/GoogleaAuth.controller');

router.post('/google-login', googleLogin);

module.exports = router;
