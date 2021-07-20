const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middlewares/auth.middleware')

const {
  speakersController
} = require('../controllers/speaker.controller');


router.get('/',  speakersController.getAllSpeakers);
router.get('/random', speakersController.getRandomSpeakers)
router.get('/speaker', authMiddleware, speakersController.getSpeakerById);
router.post('/speaker', speakersController.registerSpeaker);
router.post('/login', speakersController.login);
router.post('/avatar', authMiddleware, speakersController.addAvatar)
router.patch('/speaker', authMiddleware, speakersController.patchSpeaker);
// router.post('/like', speakersController.addRating)

router.get('/speaker/:id', speakersController.getSpeakerByIdFromParams)


module.exports = router