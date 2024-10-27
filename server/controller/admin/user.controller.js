const userModel = require("../../models/user.model");
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

        const userExist = await userModel.findOne({ name });
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
        return res.status(500).json({ message: err.message });
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

module.exports = {
    getUsers,
    storeUsers,
    updateUsers,
    deleteUsers
};
