const Review = require("../models/Reviews.model")

class ReviewController {
  async getReviewsBySpeaker(req,res) {
    try {
      const review = await Review.find(req.params.id)
      res.json(review)
    } catch (e) {
      res.json(e.message)
    }
  }
  async addReviewForSpeaker(req,res) {
    const {username, text} = req.body

    if (!username) {
      return res.status(401).json({
        error: "Необходимо указать имя юзера"
      })
    }
    if (!text) {
      return res.status(401).json({
        error: "Необходимо написать текст"
      })
    }
    try {
      const {speaker} = req.params.id
      const review = new Review({
        username, text, speaker
      })
      await review.save()
      res.json(review)
    } catch (e) {
      res.json(e.message)
    }
  }
  async deleteReview(req,res) {
    try {
      const review = await Review.findByIdAndDelete(req.params.id)
      if (!review) {
        return res.status(401).json({
          error: "Указан неправильный Id"
        })
      }
      res.json(review)
    } catch (e) {
      res.json(e.message)
    }
  }
}

module.exports = new ReviewController