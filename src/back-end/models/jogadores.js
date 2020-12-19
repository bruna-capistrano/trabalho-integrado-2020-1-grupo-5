const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const jogadorSchema = new Schema({
    nome: {
        type: String,
        required: true,
        length: 50
    },
    data_nascimento: {
        type: Date,
        required: true
    }
})

jogadorSchema.plugin(normalize);

var Jogadores = mongoose.model('jogadores', jogadorSchema);

module.exports = Jogadores;
