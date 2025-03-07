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



module.exports = router;    