const Category = require("../models/Category.model");

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const category = await Category.find();
      res.json(category);
    } catch (e) {
      res.json(e.message);
    }
  }
  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(401).json({
          error: "Неправильный Id"
        })
      }
      res.json(category);
    } catch (e) {
      res.json(e.message);
    }
  }
  async editCategory(req, res) {
    try {
      const id = req.params.id;
      const { gender } = req.body;
      const category = await Category.findByIdAndUpdate(
        id,
        { gender },
        { new: true }
      );
      res.json(category);
    } catch (e) {
      res.json(e.message);
    }
  }
  async addCategory(req, res) {
    const { gender } = req.body;

    if (!gender) {
      return res.status(401).json({
        error: "Необходимо указать свой пол"
      })
    }
    try {
      const category = new Category({
        gender,
      });
      await category.save();
      res.json(category);
    } catch (e) {
      res.json(e.message);
    }
  }
}


module.exports = new CategoryController