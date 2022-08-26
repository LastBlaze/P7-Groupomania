const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const msgCtrl = require('../controllers/msgController')
const multer = require('../middlewares/multer-config')


router.get('/', msgCtrl.getAllPublication);
router.post('/', auth, multer, msgCtrl.createPublication);
router.get('/:id', msgCtrl.getOnePublication);
router.patch('/:id', auth, multer, msgCtrl.modifyPublication);
router.delete('/:id', auth, msgCtrl.deletePublication);
router.post('/:id/like', auth, msgCtrl.likePublication);

module.exports = router;