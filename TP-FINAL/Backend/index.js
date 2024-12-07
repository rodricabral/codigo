const express = require('express');
const cors = require('cors')
const app = express();
const port = 3002;

app.use(cors())
app.use(express.json());

app.use('/proveedor', require('./routes/proveedoresRoute'));
app.use('/productos', require('./routes/productosRoute'));

var admin = require("firebase-admin");

var serviceAccount = require("./practicando-firebase-8240a-firebase-adminsdk-8tuaw-49a36ed0d0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.listen(port, ()=>{
    console.log('servidor corriendo en el puerto 3002')
})