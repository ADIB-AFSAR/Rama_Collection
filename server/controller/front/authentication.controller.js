const bcrypt = require("bcryptjs");
const userModel = require("../../models/user.model");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const login = async (req, res) => {
    console.log("login data", req.body);
    try {
        let findUser  = await userModel.findOne({ email: req.body.email });
        console.log('Found user', findUser );

        if (!findUser ) {
            console.log("User  not found with email:", req.body.email);
            return res.status(404).json({
                message: "Invalid email or password."
            });
        }

         if (findUser.status !== "active") {
            console.log("User is inactive or disabled.");
            return res.status(403).json({
                message: "Your ID has been disabled by ADMIN."
            });
        }

        // Log both passwords for comparison
        console.log('Stored hashed password:', findUser .password);
        console.log('Entered password:', req.body.password);

        // Asynchronous password comparison
        let authenticate = bcrypt.compareSync(req.body.password.trim(), findUser.password);
        console.log('authenticate:', authenticate);

        if (authenticate) {
            const token = jwt.sign({ data: findUser  }, process.env.JWT_SECRET);
            return res.status(200).json({
                message: "Logged in successfully.",
                token: token,
                user: { 
                    id : findUser._id,
                    name: findUser .name,
                     email: findUser.email ,
                      contact : findUser.contact ,
                       role : findUser.role 
                    }
            });
        } else {
            console.log("Wrong password");
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
};


const register = async (req, res) => {
    console.log("register request body",req.body)
    try {
        console.log(req.body);
        let userWithSameEmailFound = await userModel.findOne({
            email: { $regex: new RegExp(`^${req.body.email}$`, "i") } // Case-insensitive
        });

        if (userWithSameEmailFound) {
            return res.status(409).json({
                message: "User already exists."
            });
        } else {
            let hashPassword = bcrypt.hashSync(req.body.password, 5);
            await userModel.create({
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                password: hashPassword,
                // image: req.file.path.replace('public', "")
            });

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
              });
            
              await transporter.sendMail({
                from: process.env.ADMIN_EMAIL,
                to: req.body.email,
                subject: "Welcome to Rama Collection Shop!",
                html: `<p>Hi ${req.body.name},</p>
                    <p>🎉 Welcome to <b>Rama Collection Shop</b>!</p>
                    <p>Your registration was successful, and we're thrilled to have you as part of our fashion-forward family.</p>
                    <p>🛍️ Explore the latest collections, trending outfits, and exclusive deals curated just for you.</p>
                    <p>If you ever forget your password, you can reset it anytime using the email you registered with.</p>
                    <br/>
                    <p>📦 Happy shopping,<br/>The Rama Collection Team<br/>www.ramacollectionshop.com</p>`
              });

            return res.status(201).json({
                message: "User registered successfully."
            });
        }
    } catch (err) {
        console.error('from controller',err);
        return res.status(500).json({
            message: "Internal server error.",
            error: err.message
        });
    }
};

module.exports = {
    login,
    register,
};
