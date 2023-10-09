const Personaje = require('../models/Personajes')

exports.crearPersonaje = async (req, res) => {
    console.log(req.body)
    try {
        let personajeModel
        personajeModel = new Personaje(req.body)
        await personajeModel.save()
        res.send(personajeModel)
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... Ocurrió algo en el proceso. comuníquese con el administrador'})
    }

}


exports.obtenerTodosLosPersonajes = async (req, res) => {
    try {
        const personajesData = await Personaje.find()
        res.json(personajesData)
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... Ocurrió algo en el proceso. comuníquese con el administrador'})
    }

}


exports.obtenerUnSoloPersonaje = async (req, res) => {
    console.log("pepe")
    try {
        let regexIdMongo = /^[0-9a-fA-F]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const personajeData = await Personaje.findById(req.params.id)
            console.log('file: personajes.controller.js:29 -> personajeData:', personajeData)
            if (!personajeData) {
                res.status(404).json({msg:'Personaje no encontrado'})
            } else {
                res.json(personajeData)
            }
        } else {
            res.status(418).json({msg:'El id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrio algo en el proceso, comuniquese con el administrador'})
    }
}

exports.actualizarPersonaje = async(req, res) => {
    try {

        const { nombre, edad, urlImagen } = req.body
        let dataPersonaje = await Personaje.findById(req.params.id)
        if (!dataPersonaje) {
            res.status(404).json({mensaje: 'El usuario no existe' })
            return
        }

        dataPersonaje.nombre = nombre
        dataPersonaje.edad = edad
        dataPersonaje.urlImagen = urlImagen

        dataPersonaje = await Personaje.findOneAndUpdate({ _id: req.params.id }, dataPersonaje)
        res.send(dataPersonaje)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Ups, algo paso, comuníquese con el administrador'})
    }
}

exports.eliminarPersonaje = async(req, res) => {
    console.log(req)
    try {
        let regexIdMongo = /^[0-9a-fA-F]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const personajeData = await Personaje.findById(req.params.id)
            if (!personajeData) {
                res.status(404).json({msg:'El id proporcionado no se encuentra'})
            } else {
                await Personaje.findOneAndRemove({ _id: req.params.id })
                res.json({msg:"Personaje eliminado"})
            }
        } else {
            res.status(418).json({msg:'El id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrió algo en el proceso, comuníquese con el administrador'})
    }
}
