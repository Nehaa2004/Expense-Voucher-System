const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../models/userModel");

const login = (req, res) => {

    const { email, password } = req.body;

    findUserByEmail(email, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        // Simple password check (we'll hash later)
        if (user.password !== password) {
            return res.status(401).json({
                message: "Wrong Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });

    });

};

module.exports = {
    login
};