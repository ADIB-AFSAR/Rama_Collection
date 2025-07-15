const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

exports.googleGoogleLoginController = async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        profilePic: picture,
        role: 'Customer', // default
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Google Login Error", error);
    res.status(500).json({ message: "Google login failed" });
  }
};
