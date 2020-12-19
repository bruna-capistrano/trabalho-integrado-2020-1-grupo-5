const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const admSchema = new Schema({
    nome: {
        type: String,
        required: true,
        length: 50
    },
    usuario: {
        type: String,
        required: true,
        length: 50
    },
    senha: {
        type: String,
        required: true,
        length: 50
    }
})

admSchema.plugin(normalize);

var Adms = mongoose.model('adms', admSchema);

module.exports = Adms;