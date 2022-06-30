const boom = require('@hapi/boom');//Importar boom y almacenar

//--------------------------------------------------------

function validatorHandler(schema, property){//Funcion que tiene como parametros el esquema y las propiedades
  return (req, res, next) =>{//Middleware/closure
    const data = req[property];//Ingresa a la solicitud, identifica las propidades y las almacena dinamicamente
    const {error} = schema.validate(data, {abortEarly: false});//Valida los datos del esquema, envia todos los errores y los almacena
    if (error) {//Si hay un error ejecute el middleware
      next(boom.badRequest(error));
    }
    next();//Continua con la solicitud
  }
}

//-------------------------------------------------

module.exports = validatorHandler;//Exportar modulo
