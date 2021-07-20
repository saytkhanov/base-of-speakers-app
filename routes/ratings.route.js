const { ratingsController } = require("../controllers/rating.controller");

const { Router } = require("express");
const router = Router();

router.get("/rating", ratingsController.getRating);

router.post("/rating/:id", ratingsController.addRating);
router.delete("/rating/:id", ratingsController.deleteRating);


module.exports = router;
