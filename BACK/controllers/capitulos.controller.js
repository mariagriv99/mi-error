const Capitulo = require('../models/capitulos')

exports.crearCapitulo = async(req, res) => {
    try {
        let CapituloModel
        CapituloModel = new Capitulo(req.body)
        await CapituloModel.save()
        res.send(CapituloModel)
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrió algo en el proceso, comuníquese con el administrador'})
    }
}

exports.obtenerTodosLosCapitulos = async(req, res) => {
    console.log(req.ip)

    try {
        const capitulosData = await Capitulo.find()
        res.json(capitulosData)
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrió algo en el proceso, comuníquese con el administrador'})
    }
}

exports.obtenerUnSoloCapitulo = async(req, res) => {
    console.log(req.ip)

    try {
        let regexIdMongo = /^[0-9a-fA-F]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const CapituloData = await Capitulo.findById(req.params.id)
            if (!capituloData) {
                res.status(404).json({msg:'capitulo no encontrado'})
            } else {
                res.json(capituloData)
            }
        } else {
            res.status(418).json({msg:'El id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrió algo en el proceso, comuníquese con el administrador'})
    }
}

exports.actualizarCapitulo = async(req, res) => {
    try {
        let regexIdMongo = /^[0-9a-fA-F]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const capituloData = await Capitulo.findById(req.params.id)
            if (!capituloData) {
                res.status(404).json({msg:'capitulo no encontrado'})
            } else {
                const { nombre, numero, urlImagen, duracion, temporada, episodio, resumen } = req.body

                capituloData.nombre = nombre
                capituloData.urlImagen = urlImagen
                capituloData.temporada = temporada
                capituloData.episodio = episodio
                capituloData.duracion = duracion
                capituloData.resumen = resumen

            

                let documentoActualizado = await Capitulo.findOneAndUpdate({ _id: req.params.id }, capituloData, { new: true })
                res.json(documentoActualizado)

            }
        } else {
            res.status(418).json({msg:'El id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrió algo en el proceso, comuníquese con el administrador'})
    }
}

exports.eliminarCapitulo = async(req, res) => {
    console.log(req)
    try {
        let regexIdMongo = /^[0-9a-fA-F]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const capituloData = await Capitulo.findById(req.params.id)
            if (!capituloData) {
                res.status(404).json({msg:'El id proporcionado no se encuentra'})
            } else {
                await Capitulo.findOneAndRemove({ _id: req.params.id })
                res.json("capitulo eliminado")
            }
        } else {
            res.status(418).json({msg:'El id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrió algo en el proceso, comuníquese con el administrador'})
    }
}
