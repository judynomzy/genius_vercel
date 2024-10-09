const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    reference: String,
    products: Array, // Array to store products and their details
    email: String,
    amount: Number,
    status: String
}, {
    timestamps: true // Auto-generate createdAt and updatedAt fields
});

const paymentModel = mongoose.model('Payment', paymentSchema);

module.exports = paymentModel;
