const ReviewController = require("../controllers/review.controller")
const { Router } = require("express")
const router = Router()

router.get("/speaker/:id/reviews", ReviewController.getReviewsBySpeaker)
router.post("/speaker/:id/review", ReviewController.addReviewForSpeaker)
router.delete("/review/:id", ReviewController.deleteReview)

module.exports = router