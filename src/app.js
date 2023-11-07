import express from "express";
import cors from 'cors';

//borrar//
import path from "path";
import { fileURLToPath } from 'url';

//aca importamos las rutas que creamos en la carpeta routes
import personaRoutes from './routes/persona.routes.js';

//borrar//
// Obtiene la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//app.listen(3000);
///////////////////////////////////////////////////////////////////////////////////////
//aca le decimos al servidor que rutas usar
app.use('/api', personaRoutes);


//por si se solicita un endpoint que no exista
app.use((req, res, next) => {
    console.log("peticion a ruta no encontrada, respondiendo eso...");
    res.status(404).json({ message: 'Ruta no encontrada' });
})

export default app;