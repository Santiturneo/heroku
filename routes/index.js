const express = require('express');//Importamos express y lo almacenamos en variable constante
//Se importan las rutas

//-------------------------------------------------------

const productosRouter = require('./productos.router');
const categoriasRouter = require('./categorias.router');
const usuariosRouter = require('./usuarios.router');

//----------------------------------------------

function routerApi(app){//Funcion con parametro
  const router = express.Router();//Router recibe la informacion de express y genera el redireccionamiento a la variable constante
  app.use('/api/v1', router);//endPoint global
  router.use('/productos', productosRouter);//Llamados de la funcion con argumentos
  router.use('/categorias', categoriasRouter);
  router.use('/usuarios', usuariosRouter);
}

//---------------------------------------------

module.exports = routerApi;//Exportar la funcion routerApi
