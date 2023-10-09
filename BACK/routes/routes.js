const express = require ('express')
const router = express.Router()
const personajesController = require('../controllers/personajes.controller')
const capitulosController = require('../controllers/capitulos.controller')
const usuariosController = require('../controllers/usuarios.controller')
const sessionController = require('../controllers/sesionController')
const mdJWT = require('../middleware/jwt')

router.get('/obtener-personajes', personajesController.obtenerTodosLosPersonajes)  
router.get('/buscar-personaje/:id', personajesController.obtenerUnSoloPersonaje)  
router.post('/crear-personaje/', personajesController.crearPersonaje)  
router.put('/actualizar-personaje/:id', personajesController.actualizarPersonaje)
router.delete('/eliminar-personaje/:id', personajesController.eliminarPersonaje)


router.get('/obtener-capitulos', capitulosController.obtenerTodosLosCapitulos)  
router.get('/buscar-capitulos', capitulosController.obtenerUnSoloCapitulo) 
router.post('/crear-capitulo', capitulosController.crearCapitulo) 
router.put('/actualizar-capitulo/:id', capitulosController.actualizarCapitulo)
router.delete('/eliminar-capitulo/:id', capitulosController.eliminarCapitulo)  


    
    http://localhost:3000/api/v1/buscar-personaje/

    router.get('/usuarios', mdJWT.verificarToken, usuariosController.buscarUsuarios)
    router.get('/usuario/:id', usuariosController.buscarUnUsuario)
    router.get('/usuario2/:nombre', usuariosController.buscarUnUsuarioPorNombre)
    router.put('/usuario/:id', usuariosController.actualizarUsuario)
    router.delete('/usuario/:id', usuariosController.eliminarUsuario)
    router.post('/usuario', usuariosController.crearUsuario)
    
    router.post('/ingreso', sessionController.generarToken)
