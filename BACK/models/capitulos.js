const mongoose = require('mongoose')
const capituloSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    
    urlImagen: {
        type: String,
        required: true
    },
    
    temporada: {
        type: Number,
        required: true
    },
    episodio: {
        type: Number,
        required: true
    },
    
    duracion: {
        type: String,
        required: true
    },

    resumen: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Capitulo', capituloSchema)
