const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,

    }
})

const Color = mongoose.model('color', ColorSchema)

module.exports = Color;