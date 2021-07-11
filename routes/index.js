const {Router} =require('express');
const router = Router();

router.use(require('./reviews.route'));
router.use(require('./speakers.route'));
router.use(require('./voices.route'));
router.use(require('./categories.route'))

module.exports = router;