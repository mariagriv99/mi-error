const Usuario = require('../models/Usuarios')

exports.crearUsuario = async (req, res) => {
    console.log(req.body)
    try {
        let usuarioModel
        usuarioModel = new Usuario(req.body)
        await usuarioModel.save()
        res.send(usuarioModel)
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... Ocurrió algo en el proceso. comuníquese con el administrador'})
    }

}

exports.buscarUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Ups, algo paso, comuníquese con el administrador'})
    }
}
exports.buscarUnUsuario = async(req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        if (!usuario) {
            res.status(404).json({ mensaje: 'El usuario no existe' })
            return
        }
        res.json(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Ups, algo paso, comuníquese con el administrador'})
    }
}

exports.buscarUnUsuarioPorNombre = async(req, res) => {
    try {
        const usuario = await Usuario.find({ nombre: req.params.nombre })
        if (!usuario) {
            res.status(404).json({ mensaje: 'El usuario no existe' })
            return
        }
        res.json(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Ups, algo paso, comuníquese con el administrador'})
    }
}


exports.obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuariosData = await Usuario.find()
        res.json(usuariosData)
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... Ocurrió algo en el proceso. comuníquese con el administrador'})
    }

}


exports.obtenerUnSoloUsuario = async (req, res) => {
    console.log("pepe")
    try {
        let regexIdMongo = /^[0-9a-fA-F]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const usuarioData = await Usuario.findById(req.params.id)
            console.log('file: usuarios.controller.js:29 -> usuarioData:', usuarioData)
            if (!usuarioData) {
                res.status(404).json({msg:'Usuario no encontrado'})
            } else {
                res.json(usuarioData)
            }
        } else {
            res.status(418).json({msg:'El id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrio algo en el proceso, comuniquese con el administrador'})
    }
}

exports.actualizarUsuario = async(req, res) => {
    try {

        const { nombre, edad, correo, contrasena } = req.body
        let dataUsuario = await Usuario.findById(req.params.id)
        if (!dataUsuario) {
            res.status(404).json({ mensaje: 'El usuario no existe' })
            return
        }

        dataUsuario.nombre = nombre
        dataUsuario.edad = edad
        dataUsuario.correo = correo
        dataUsuario.contrasena = contrasena

        dataUsuario = await Usuario.findOneAndUpdate({ _id: req.params.id }, dataUsuario)
        res.send(dataUsuario)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Ups, algo paso, comuníquese con el administrador'})
    }
}

exports.eliminarUsuario = async(req, res) => {
    console.log(req)
    try {
        let regexIdMongo = /^[0-9a-fA-F]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const usuarioData = await usuario.findById(req.params.id)
            if (!usuarioData) {
                res.status(404).json({msg:'El id proporcionado no se encuentra'})
            } else {
                await Usuario.findOneAndRemove({ _id: req.params.id })
                res.json({msg:"Usuario eliminado"})
            }
        } else {
            res.status(418).json({msg:'El id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({msg:'Ups... ocurrió algo en el proceso, comuníquese con el administrador'})
    }
}
