import { pool } from '../db.js';
import { jsPDF } from 'jspdf';
//borrar//
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from 'url';

export const consultarPersonas = async (req, res) => {

    try {
        let sql = 'SELECT * FROM personasid'
        let rtaMySql = await pool.query(sql, [])
        let personasEncontradas = rtaMySql[0];

        if (personasEncontradas.length > 0) {
            console.log(personasEncontradas)
            return res.status(200).json(personasEncontradas)
        } else {
            return res.status(204).json()
        }
    } catch (e) {
        return res.status(500).json({ message: `Error en el servidor ${e.sqlMessage}` })
    }

}



export const generarReportePDF = async (req, res) => {
    try {
        console.log("Generando PDF...");
        const sql = 'SELECT * FROM personasid';
        const rtaSql = await pool.query(sql, []);
        const arraRta = rtaSql[0];

        if (arraRta.length > 0) {
            const pdf = new jsPDF();
            let y = 10;
            pdf.text("REPORTE PERSONAS CREADOS", 10, y);
            y += 30;

            arraRta.forEach(p => {
                pdf.text(`Nombre: ${p.nombre}, Edad: ${p.edad}, Título: ${p.titulo}`, 10, y);
                y += 10;
            });

            // Nombre del archivo PDF
            const pdfFileName = 'REPORTEPERSONAS.pdf';

            // Ruta completa al archivo PDF en la carpeta "public"
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const pdfFilePath = path.join(__dirname, '../public', pdfFileName);

            // Guarda el PDF en la carpeta "public"
            pdf.save(pdfFilePath);

            // Configura el tipo de contenido como PDF
            res.contentType('application/pdf');

            // Envía el archivo PDF como respuesta
            res.sendFile(pdfFileName, { root: path.join(__dirname, '..', 'public') });
        } else {
            res.status(204).json();
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: `Error del servidor, ${e}` });
    }
};



export const consultarPersonaPorID = async (req, res) => {
    try {
        const id = req.params.id
        const sql = 'SELECT * FROM personasid WHERE id = ?'
        const datos = [id]
        const rtaSql = await pool.query(sql, datos)
        let arraRta = rtaSql[0]
        console.log(rtaSql)
        console.log(arraRta)
        if (arraRta.length > 0) {
            let producto = arraRta[0]
            return res.status(200).json(producto)
        } else {
            res.status(204).json()
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: `Error del servidor, ${e}` })
    }
}



export const crearPersona = async (req, res) => {

    try {
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let titulo = req.body.titulo;

        //console.log(`Se recibio el producto de id ${id}, nombre: ${nombre} de marca ${marca}, con precio: ${precio}`)

        let sql = 'INSERT INTO `personaid`.`personasid` (`nombre`, `edad`, `titulo`) VALUES (?,?,?);'
        let datos = [nombre, edad, titulo];

        let rta = await pool.query(sql, datos)
        console.log(rta[0])

        if (rta[0].affectedRows == 1) {
            return res.status(200).json({ message: 'Persona guardada con exito' })
        }
    } catch (e) {
        console.log(`ocurrio un error de mysql ${e}`)
        return res.status(500).json({ message: `Ocurrio un error de MySQL, mensaje: ${e.sqlMessage}` })
    }
}


export const eliminarPersona = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = 'DELETE FROM personasid WHERE id = ?';
        let rtaSql = await pool.query(sql, [id])
        let rta = rtaSql[0];
        console.log(rta)
        if (rta.affectedRows == 1) {
            res.status(200).json({ message: 'Persona eliminado con exito' })
        } else {
            res.status(204).json()
        }
    } catch (e) {
        console.log(e)
    }

}

export const actulizarPersona = async (req, res) => {

    try {
        let id = req.params.id;
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let titulo = req.body.titulo;


        let sql = 'UPDATE `personaid`.`personasid` SET `nombre` = ?, `edad` = ?, `titulo` = ? WHERE `id` = ?';
        let datos = [nombre, edad, titulo, id];

        let rta = await pool.query(sql, datos)
        console.log(rta[0])

        if (rta[0].affectedRows == 1) {
            return res.status(200).json({ message: 'Persona actualizada con exito' })
        }
    } catch (e) {
        console.log(`ocurrio un error de mysql ${e}`)
        return res.status(500).json({ message: `Ocurrio un error de MySQL, mensaje: ${e.sqlMessage}` })
    }
}
