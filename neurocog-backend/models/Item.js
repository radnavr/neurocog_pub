const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    jmeno: String,
    id: Number,
    zaber: String,
    umisteni: String,
    minVek: Number,
    maxVek: Number,
    exekutiva: Boolean,
    konstrukce: Boolean,
    matematika: Boolean,
    motorika: Boolean,
    mysleni: Boolean,
    pamet: Boolean,
    pozornost: Boolean,
    rec: Boolean,
    vizuoprostor: Boolean
})

module.exports = mongoose.model('Item', itemSchema);