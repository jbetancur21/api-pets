const express = require('express');
const routes_medicamentos = express.Router()

routes_medicamentos.get('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * from medicamentos', (err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes_medicamentos.post('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO medicamentos set ?', [req.body], (err,rows)=>{
            if(err) return res.send(err)

            res.send('Datos insertados correctamente!')
        })
    })
})


routes_medicamentos.put('/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE medicamentos SET ? WHERE id=?', [req.body,req.params.id], (err,rows)=>{
            if(err) return res.send(err)

            res.send('Datos actualizados correctamente!')
        })
    })
})
module.exports = routes_medicamentos