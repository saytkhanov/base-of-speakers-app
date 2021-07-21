const { Router } = require("express");
const router = Router();
//
router.use(require('./reviews.route'));
router.use(require("./speakers.route"));
router.use(require("./voices.route"));
router.use(require("./ratings.route"));



module.exports = router;
