const express = require('express');//Se importa servidor express y lo almacena en variable constante
const routerApi = require('./routes');//Importa el directorio routes
const cors = require('cors');//Importa y almacena, npm i cors
//const {boomErrorHandler} = require('./middlewares/error.handler');//Importa archivo y almacena

//---------------------------------------------------------------------------

const app = express();//Variable constante almacena express que actuara como metodo constructor
const port = process.env.PORT || 3000;//Puerto en el que corre la aplicacion

//--------------------------------------------------------

app.use(express.json());//Middleware que recibe informacion de tipo jason enviada por post y devuelve como respuesta un json

/*const whitelist = ['http://localhost:8080', 'https://myapp.co'];//Dominios que tienen permitido acceder al aplicativo
const options = {//Variable que almacena objeto
  origin: (origin, callback)=>{//
    if (whitelist.includes(origin)) {//Si el origen esta incluido en whitelist permite el acceso y ejecuta callback
      callback(null, true);
    }else{//Ejecuta un error
      callback(new Error('No permitido'));
    }
  }
}*/
app.use(cors());//Permite que otros dominios puedan hacer uso de la informacion de la aplicacion

//---------------------------------------------------------------

app.get('/', (req, res) => {//Express utiliza metodo get, se dirige a la ruta / o endPoint y tiene un callback que retorna un res.send (respuesta string)
  //res.sendFile('C:\\Users\\Usuario\\Documents\\proyectoExpress\\views\\index.html');
  res.sendFile(__dirname + '/views/index.html');
});

//------------------------------------------------------------

app.get('/style.css', (req, res) =>{
  res.sendFile(__dirname + '/views/style.css')
});

//--------------------------------------------------------------------

app.get('/nueva-ruta', (req, res) => {//Express utiliza metodo get, se dirige a la ruta o endPoint /nueva-ruta y tiene un callback que retorna un res.send (respuesta string)
  res.send('Hola, soy nueva ruta');
});

//-------------------------------------------------------------------------------

app.listen(port, () => {//Express utiliza metodo listen que escucha el puerto y callback que imprime un string junto con el puerto
  console.log('Mi port' + port);
});

//------------------------------------------------------------------------

routerApi(app);//Llamado de la funcion con argumento

//-----------------------------------------------------------

//app.use(logErrors)//Ejecuta middlewares en el orden que hayan sido declarados
//app.use(errorHandler)
//app.use(boomErrorHandler)
