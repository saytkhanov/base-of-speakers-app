const Rating = require("../models/Rating.model");

module.exports.ratingsController = {
  getRatingBySort: async (req, res) => {
    try {
      const rating = await Rating.find({}, { _id: 0 }).sort({ rating: -1 });
      res.json(rating);
    } catch (e) {}
  },
  addRating: async (req, res) => {
    try {
      const speaker = req.params.id;
      const { rating } = req.body;
      const ratingCreate = await new Rating({ speaker, rating });
      await ratingCreate.save();
      res.json(ratingCreate);
    } catch (e) {
      res.json({ error: e.message });
    }
  },
  getRating: async (req, res) => {
    try {
      const rating = await Rating.find();
      res.json(rating);
    } catch (e) {
      res.json({ error: e.message });
    }
  },
  deleteRating: async (req, res) => {
    try {
      const ratingCreate = await Rating.findByIdAndDelete(req.params.id);

      res.json(ratingCreate);
    } catch (e) {
      res.json({ error: e.message });
    }
  },
};
