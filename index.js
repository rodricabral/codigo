const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/authRoute')

app.use(cors());

app.use(express.json());

app.use('/salon', require('./routes/salonRoute'));
app.use('/login', authRoute)

var admin = require("firebase-admin");

var serviceAccount = require("./practicando-firebase-8240a-firebase-adminsdk-8tuaw-6c721c316d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.listen(3001, ()=>{
    console.log('servidor corriendo en puerto 3001')
})