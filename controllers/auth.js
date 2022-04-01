const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const username = shortId.generate();
    const profile = `${process.env.CLIENT_URL}/profile/${username}`;
    const newUser = await new User({
      name,
      email,
      password,
      username,
      profile,
    });
    await newUser.save();
    return res.json({ success: "user has been saved successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.signin = async (req, res) => {
  try {
    //check if user exists
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    //check if password matches
    if (!existingUser.authenticate(password)) {
      return res
        .status(400)
        .json({ error: "Athentication Failed.wrong email or password" });
    }
    //generate jwt token
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      user: existingUser,
    };
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1d" });
    const { _id, name, username, role } = existingUser;
    res.cookie("token", token, { expiresIn: "1d" });
    return res.json({
      token,
      user: { _id, name, username, email, role },
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout Success",
  });
};
