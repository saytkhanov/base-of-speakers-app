const Review = require("../models/Reviews.model");
const httpStatus = require("http-status");

class ReviewController {
  async getReviewsBySpeaker(req, res) {
    try {
      const review = await Review.find();
      res.json(review);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  }
  async addReviewForSpeaker(req, res) {
    const { username, text } = req.body;

    if (!username) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Необходимо указать имя юзера",
      });
    }
    if (!text) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: "Необходимо написать текст",
      });
    }
    try {
      const speaker = req.params.id;
      const review = new Review({
        username,
        text,
        speaker,
      });
      await review.save();
      res.json(review);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  }
  async deleteReview(req, res) {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) {
        return res.status(httpStatus.BAD_REQUEST).json({
          error: "Указан неправильный Id",
        });
      }
      res.json(review);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  }
}

module.exports = new ReviewController();
