/*function logErrors(err, req, res, next) {//Funcion middleware de tipo error
  console.error(err);//Impresion del error
  next(err);//Ejecutara middleware de tipo error
}*/

/*function errorHandler(err, req, res, next) {//Funcion middlware de tipo error
  res.status(500).json({//Como respuesta envia el codigo de estado en formato json
    message: err.message,//Mensaje de error
    stack: err.stack,//Indica donde ocurre el error
  });
}*/

function boomErrorHandler(err, req, res, next) {//Funcion middleware de tipo error
  if (err.isBoom) {//Si el error es de tipo boom
    const {output}=err;//Toma el cuerpo del error y lo almacena en output
    res.status(output.statusCode).json(output.payload);//Responde con metodo status, recibe como argumento el cuerpo e identifica codigo de estado,
  }
  next(err);
}

//---------------------------------------------------------

module.exports = {boomErrorHandler}//Exportar modulo
