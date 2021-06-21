const mongoose = require("mongoose");

// The items that are stored
const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

    },
    { timestamps: true }
);

module.exports = ItemSchema;