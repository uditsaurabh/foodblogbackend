const Category = require("../models/category");
const slugify = require("slugify");

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();
    const category = new Category({ name, slug });
    const savedCategory = await category.save();
    res.send(savedCategory);
  } catch (e) {
    res.send({ message: e.message });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    let categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    res.send({ message: e.message });
  }
};
exports.getCategory = async (req, res) => {
  try {
    let { slug } = req.params;
    let categories = await Category.findOne({ slug });
    return res.send(categories); //blogs associated with this category has to bbe returned
  } catch (e) {
    res.send({ message: e.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    let { slug } = req.params;
    let categories = await Category.deleteOne({ slug });
    return res.send(categories);
  } catch (e) {
    res.send({ message: e.message });
  }
};
