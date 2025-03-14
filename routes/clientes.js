const express = require('express');
const router = express.Router();
const pool = require('../db');
//crear un cliente

router.post('/', async (req, res) => {
    try{
        const { nombre, email, telefono } = req.body;
        const {result} = await pool.execute('INSERT INTO cliente (nombre, email, telefono) VALUES (?,?,?)',[nombre, email, telefono]);
        res.status(201).json({ id: result.insertId, nombre, email, telefono });        
    } catch (error){
        res.status(500).send(error);
    }
});

router.get('/', async (req, res) => {
    try{
        const [rows] = await pool.execute(
            'SELECT * FROM cliente');
        res.json(rows);        
    } catch (error){
        res.status(500).send(error);
    }
});

//obtener un solo cliente
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const [ rows ] = await pool.execute(
            'SELECT * FROM cliente where id_clientes = ?',
            [id]
        );
        if(rows.length > 0){
            res.json(rows[0]);
        } else {
            res.status(404).json({message: 'Cliente no encontrado '});
        }
    } catch (error){
        res.status(500).send(error);
    }
});

//actualizar un cliente
router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, email, telefono } = req.body;
        const [ result ] = await pool.execute(
            'UPDATE cliente SET nombre = ?, email = ?, telefono = ? WHERE id_clientes = ?',
            [nombre, email, telefono, id]
        );
        if(result.affectedRows > 0){
            res.json({ id, nombre, email, telefono });
        } else {
            res.status(404).json({message: 'Cliente no encontrado '});
        }
    } catch (error){
        res.status(500).send(error);
    }
});

//eliminar cliente 

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const [ result ] = await pool.execute(
            'DELETE FROM cliente WHERE id_clientes = ?',
            [id]
        );
        if(result.affectedRows > 0){
            res.json({message: 'Cliente eliminado'});
        } else {
            res.status(404).json({message: 'Cliente no encontrado '});
        }
    } catch (error){
        res.status(500).send(error);
    }
});



module.exports = router;    