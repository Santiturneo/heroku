const express = require('express');//Importamos servidor express y almacenamos
const UsuariosService = require('./../services/usuarios.service');//Importamos archivo y almacenamos

//-----------------------------------------------------

const router = express.Router();//Se almacena la funcion que permite trabajar con los metodos http
const service = new UsuariosService();//Instanciamos el objeto

//-------------------------------------------------------

/*router.get('/', (req, res) =>{//Express utiliza metodo get que se dirige hasta la ruta /users o endPoint, callback que identifica 2 parametros tomados del query
  const {limit, offset}=req.query;//De query quiero limit y offset
  if (limit&&offset){//Condicional if que indica, si existen ambos parametros entonces se genera la impresion en formato json
    res.json({
      limit,
      offset
    });
  }else{//Derivado del condicional if, si no ocurre lo anterior ocurre esto, (string como respuesta)
    res.send('No hay parametros');
  }
});*/

//-------------------------------------------------------

router.get('/:id', async (req, res) =>{//Ruta con parametro y callback (Se hace uso de async await para trabajar asincronicamente)
  const {id}=req.params;//Ingresa a la solicitud, identifica parametros y hace uso del id
  const usuario = await service.findOne(id);//Accede al objeto, identifica metodo, pasa argumento y el resultado lo almacena
  res.json(usuario);//Respuesta en formato json
})

//------------------------------------------------------

router.get('/', async (req, res) => {//Ruta con callback (Se hace uso de async await para trabajar asincronicamente)
  const usuario = await service.find();//Ingresa al objeto, identifica el metodo, devuelve resultado y lo almacena
  res.json(usuario);//Entrega respuesta en formato json
});

//-------------------------------------------------------------

router.post('/', async (req, res)=>{//Ruta con callback (Se hace uso de async await para trabajar asincronicamente)
  const body = req.body;//Ingresa a solicitud, identifica el cuerpo y lo almacena
  const newUsuario = await service.create(body);//Accede al objeto, identifica el metodo, pasa argumento y el resultado lo almacena en variable
  res.status(201).json(newUsuario);//Responde con codigo de estado (201 create) y formato json
})

//--------------------------------------------

router.patch('/:id', async (req, res)=>{//Ruta con parametro y callback (Se hace uso de async await para trabajar asincronicamente)
  try {//Permite trabajar las condiciones de una manera mas limpia
  const {id} = req.params;//Ingresa a la solicitud, identifica parametros y hace uso del id
  const body = req.body;//Ingresa a solicitud, identifica el cuerpo y lo almacena
  const usuario = await service.update(id, body);//Ingresa al objeto, identifica el metodo pasa argumentos y almacena el resultado
  res.json(usuario);//Respuesta en formato json
  } catch (error) {//Devuelve el error
    res.status(404).json({//Respuesta en formato json con el codigo de estado (404 error)
      message: error.message//Mensaje de error
    });
  }
});

//------------------------------------------------------------------

router.delete('/:id', async (req, res)=>{//Ruta con parametro y callback (Se hace uso de async await para trabajar asincronicamente)
  const {id} = req.params;//Ingresa a la solicitud, identifica parametros y hace uso del id
  const usuario = await service.delete(id)//Ingresa al objeto, identifica metodo, pasa argumento y almacena resultado
  res.json(usuario);//Respuesta en formato json
})

//---------------------------------------------------

module.exports = router;//Exportamos modulo router
