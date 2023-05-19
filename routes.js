const express = require("express");
const routes = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

//middleware------------------------------------
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


routes.get("/auth/:usuario", (req, res) => {
    
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * from usuarios where usuario =?  ",
      [req.params.usuario],
      (err, rows) => {
        if (err) return res.send(err);
        const user = req.params.usuario;
        try {
          if (user === rows[0].usuario) {
            //Aqui estoy validando, si el usuario ingresado es igual al encontrado por la consulta, entonces me da un token 
            const accessToken = generateAccessToken(user);
            
              res.header('authorization',accessToken).json({
                message:'Usuario Autenticado',
                token:accessToken
            });   
          }
        } catch (error) {}      


      }
    );
  });
});

function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET)
}

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
//APIS--------------------------------------------------------------
routes.get("/:usuario",validateToken, (req, res) => {
    
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * from usuarios where usuario =?",
      [req.params.usuario],
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routes.post("/",validateToken, (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    conn.query("INSERT INTO usuarios set ?", [req.body], (err, rows) => {
      if (err) return res.send(err);

      res.send("Datos insertados correctamente!");
    });
  });
});

routes.delete("/:id",validateToken, (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "DELETE FROM usuarios WHERE id=?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("El dato seleccionado se elimino correctamente!");
      }
    );
  });
});

routes.put("/:id",validateToken, (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "UPDATE usuarios SET ? WHERE id=?",
      [req.body, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("Datos actualizados correctamente!");
      }
    );
  });
});
module.exports = routes;


