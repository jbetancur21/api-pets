const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const cors = require('cors')

const routes = require('./routes')
const routes_clientes = require('./routes-clientes')
const routes_mascotas = require('./routes-mascotas')
const routes_medicamentos = require('./routes-medicamentos')

const app = express()
app.set('port',process.env.PORT || 9000)
/*BD Alterna */
const dbOptions = {
    host:'frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'w0vhfyjlw8f5txjc',
    password:'h93bd7o25dtdd472',
    database:'j3ce1y5xo8y1tdwi'
}
/*BD Principal */
/* const dbOptions = {
    host:'us-cdbr-east-06.cleardb.net',
    user:'be2c22917bae43',
    password:'944e5079',
    database:'heroku_819501358f8d9a6'
} */
/*BD Local */
/* const dbOptions = {
    host:'localhost',
    user:'root',
    password:'',
    database:'pets'
} */

//middleware------------------------------------
app.use(myconn(mysql,dbOptions,'single'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


//routes----------------------------------------
app.get('/',(req,res)=>{
    res.send('Welcome to my API')
})
app.use('/api',routes)//CRUD Usuarios
app.use('/api_clientes',routes_clientes)
app.use('/api_mascotas',routes_mascotas)
app.use('/api_medicamentos',routes_medicamentos)

// server running-------------------------------
app.listen(app.get('port'),()=>{
    console.log('server running on port',app.get('port'))
})