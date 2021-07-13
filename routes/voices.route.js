const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware');

const {
  voicesControllers
} = require('../controllers/voice.controller')

router.get('/speaker/:id/voices', voicesControllers.getVoicesById );
router.delete('/speaker/:id/voice', authMiddleware, voicesControllers.deleteVoice);
router.post('/voice', authMiddleware, voicesControllers.createVoice);

module.exports = router