const express = require('express');
const routes_clientes = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config()

//middleware------------------------------------
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

/*Validar bien como se implementa para no poner el token en la url, si no con variables*/
function validateToken(req,res,next){
    const accessToken = req.headers['authorization'] || req.query.accesstoken;
    if(!accessToken) res.send('Access Denied');

    jwt.verify(accessToken,process.env.SECRET,(err,user)=>{
        if(err){
            res.send('Access denied, token expires or incorrect')
        }else{
            next();
        }
    })
}



routes_clientes.get('/',validateToken,(req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * from clientes', (err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes_clientes.post('/',validateToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO clientes set ?', [req.body], (err,rows)=>{
            if(err) return res.send(err)

            res.send('Datos insertados correctamente!')
        })
    })
})

routes_clientes.delete('/:id',validateToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM clientes WHERE id=?', [req.params.id], (err,rows)=>{
            if(err) return res.send(err)

            res.send('El dato seleccionado se elimino correctamente!')
        })
    })
})

routes_clientes.put('/:id',validateToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE clientes SET ? WHERE id=?', [req.body,req.params.id], (err,rows)=>{
            if(err) return res.send(err)

            res.send('Datos actualizados correctamente!')
        })
    })
})
module.exports = routes_clientes