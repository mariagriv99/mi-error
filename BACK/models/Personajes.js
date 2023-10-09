const mongoose = require('mongoose')
const PersonajeSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    urlImagen: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Personaje', PersonajeSchema)

