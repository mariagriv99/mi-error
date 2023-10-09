const mongoose = require('mongoose')
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true
    },

    contrasena: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
