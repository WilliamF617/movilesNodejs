import { Router } from 'express'
import { consultarPersonas, generarReportePDF, consultarPersonaPorID, crearPersona, eliminarPersona, actulizarPersona, imagenServidor } from '../controllers/personas.controller.js';
const router = Router();

router.get('/personas', consultarPersonas) //consultar todas las personas
router.get('/personas/reportePdf', generarReportePDF)  //generar un PDF con todas las personas
router.get('/persona/id/:id/', consultarPersonaPorID) //Consultar una persona por ID
router.post('/persona', crearPersona) //Crear una persona al listado
router.delete('/persona/id/:id', eliminarPersona) //Eliminar una persona de la lista
router.put('/personaid/id/:id', actulizarPersona) //Actualizar una persona por ID
router.get('/imagenServidor', imagenServidor) //Imagen solicitada del servidor

export default router


