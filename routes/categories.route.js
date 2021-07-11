const CategoriesController = require("../controllers/category.controller")
const { Router } = require("express")
const router = Router()

router.get("/categories", CategoriesController.getAllCategories)
router.delete("/category/:id", CategoriesController.deleteCategory)
router.patch("/category/:id", CategoriesController.editCategory)
router.post("/category", CategoriesController.addCategory)

module.exports = router