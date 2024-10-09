const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body
        const user = await userModel.findOne({email})
        console.log("user", user)
        if(user){
          throw new Error("User already exist")
        }
        // Validate input fields
        if (!email) {
            throw new Error("Please provide an email")
        }
        if (!password) {
            throw new Error("Please provide a password")
        }
        if (!name) {
            throw new Error("Please provide a name")
        }

        // Generate salt and hash password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {throw new Error("Something is wrong")}

        // Prepare payload with hashed password
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        };

        // Create and save the user
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Send successful response
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch(err) {
        // Handle errors
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
