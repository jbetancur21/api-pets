const express = require('express');
const routes_mascotas = express.Router()

routes_mascotas.get('/',(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * from mascotas', (err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes_mascotas.post('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO mascotas set ?', [req.body], (err,rows)=>{
            if(err) return res.send(err)

            res.send('Datos insertados correctamente!')
        })
    })
})


routes_mascotas.put('/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE mascotas SET ? WHERE id=?', [req.body,req.params.id], (err,rows)=>{
            if(err) return res.send(err)

            res.send('Datos actualizados correctamente!')
        })
    })
})
module.exports = routes_mascotas