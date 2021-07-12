const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware')

const {
  speakersController
} = require('../controllers/speaker.controller');

router.get('/speaker', speakersController.getAllSpeakers);
router.post('/speaker', speakersController.registerSpeaker);
router.post('/login', speakersController.login);
router.patch('/speaker/:id', authMiddleware, speakersController.patchSpeaker);

module.exports = router