const mongoose = require("mongoose");
const z = require("zod");

// Zod schema for email validation
const emailValidator = z.string().email().min(5).max(255);

// Mongoose schema with Zod validation for the email field
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: (value) => {
                try {
                    emailValidator.parse(value);
                    return true;
                } catch (error) {
                    return false;
                }
            },
            message: (props) => `${props.value} is not a valid email address.`,
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
