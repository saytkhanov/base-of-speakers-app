const { ratingsController } = require("../controllers/rating.controller");

const { Router } = require("express");
const router = Router();

router.get("/rating", ratingsController.getRating);
router.get('/byrating', ratingsController.getRatingBySort)
router.post("/rating/:id", ratingsController.addRating);
router.delete("/rating/:id", ratingsController.deleteRating);
router.get('/sort', ratingsController.getRatingBySort)


module.exports = router;
