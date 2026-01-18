const userModel = require("../../models/user.model");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const storeUsers = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, contact, password, role, status } = req.body;

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(409).json({ message: "User already exists!" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        await userModel.create({
            name,
            email,
            contact,
            password: hashPassword,
            role,
            status
        });
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message + "controller issue"});
    }
};

const updateUsers = async (req, res) => {
    console.log(req.params , req.body)
    try {
        const userExist = await userModel.findOne({ _id: req.params.id });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const { name, email, contact, password, role, status } = req.body;
        // const hashPassword = bcrypt.hashSync(password, 10);

        await userModel.updateOne({ _id: req.params.id }, {
            name,
            email,
            contact,
            password,
            role,
            status
        });

        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const userExist = await userModel.findOne({ _id: req.params.id });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        await userModel.deleteOne({ _id: req.params.id });
        return res.status(204).send(); // No content response
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const resetUrl = `${process.env.DOMAIN_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Rama Collection" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset - Rama Collection",
      html: `
        <p>Hello ${user.name || "User"},</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link is valid for 15 minutes.</p>
      `
    });

    return res.status(200).json({ message: "Reset email sent" });

  } catch (err) {
  console.error("Forgot password email error:", err);

  return res.status(500).json({
    message: "Unable to send reset email. Please try again later.",
    debug: err.message // REMOVE after debugging
  });
}
};


const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log("Received token:", token);
  console.log("Received password:", password);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified:", decoded);

    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
  console.error("JWT verification failed:", err.message);
  return res.status(400).json({
    message: "Token expired or invalid"
  });
}
};


module.exports = {
    getUsers,
    storeUsers,
    updateUsers,
    deleteUsers,
    forgotPassword,
    resetPassword
};
