

const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');

const {
  voicesControllers
} = require('../controllers/voice.controller')

router.get('/voice', voicesControllers.getAllVoice)
router.get('/voices', authMiddleware, voicesControllers.getVoicesById );
router.delete('/voice/:id', authMiddleware, voicesControllers.deleteVoice);
router.post('/voice', authMiddleware, voicesControllers.createVoice);
router.post('/voice/upload', authMiddleware, voicesControllers.uploadVoice)

module.exports = router