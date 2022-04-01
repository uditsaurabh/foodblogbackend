const Tag = require("../models/Tag");
const slugify = require("slugify");

exports.createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();
    const Tag = new Tag({ name, slug });
    const savedTag = await Tag.save();
    res.send(savedTag);
  } catch (e) {
    res.send({ message: e.message });
  }
};
exports.getAllTags = async (req, res) => {
  try {
    let Tags = await Tag.find();
    return res.send(Tags);
  } catch (e) {
    res.send({ message: e.message });
  }
};
exports.getTag = async (req, res) => {
  try {
    let { slug } = req.params;
    let Tags = await Tag.findOne({ slug });
    return res.send(Tags); //blogs associated with this Tag has to bbe returned
  } catch (e) {
    res.send({ message: e.message });
  }
};
exports.deleteTag = async (req, res) => {
  try {
    let { slug } = req.params;
    let Tags = await Tag.deleteOne({ slug });
    return res.send(Tags);
  } catch (e) {
    res.send({ message: e.message });
  }
};
