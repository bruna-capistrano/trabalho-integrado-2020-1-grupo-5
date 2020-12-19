const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const partidaSchema = new Schema({
    data: {
        type: Date,
        required: true
    },
    arbitro: {
        type: String,
        required: true,
        length: 50
    },
    local: {
        type: String,
        required: true,
        length: 50
    },
    time_A: {
        type: Schema.Types.ObjectId,
        ref: 'times'
    },
    time_B: {
        type: Schema.Types.ObjectId,
        ref: 'times'
    },
    gols_time_A: {
        type: Number,
        required: true,
        min: 0,
        max: 99
    },
    gols_time_B: {
        type: Number,
        required: true,
        min: 0,
        max: 99
    }
    /*,
    jogadores: [{
        type: mongoose.ObjectId,
        ref: 'partida_jogador'
      }]*/
});

partidaSchema.plugin(normalize);

var Partidas = mongoose.model('partidas', partidaSchema);

module.exports = Partidas;