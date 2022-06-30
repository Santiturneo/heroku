const express = require('express');//Importamos servidor express y almacenamos
const CategoriasService = require('./../services/categorias.service');//Importamos archivo y almacenamos

//--------------------------------------------------------

const router = express.Router();//Se almacena la funcion que permite trabajar con los metodos http
const service = new CategoriasService();//Instanciamos el objeto

//-------------------------------------------------------

router.get('/:id', async (req, res) =>{//Ruta con parametro y callback (Se hace uso de async await para trabajar asincronicamente)
  const {id}=req.params;//Ingresa a la solicitud, identifica parametros y hace uso del id
  const categoria = await service.findOne(id);//Accede al objeto, identifica metodo, pasa argumento y el resultado lo almacena
  res.json(categoria);//Respuesta en formato json
})

//------------------------------------------------------

router.get('/', async (req, res) => {//Ruta con callback (Se hace uso de async await para trabajar asincronicamente)
  const categoria = await service.find();//Ingresa al objeto, identifica el metodo, devuelve resultado y lo almacena
  res.json(categoria);//Entrega respuesta en formato json
});

//-------------------------------------------------------------

/*router.get('/:categoryId/products/:productId', (req, res) =>{//Express utiliza metodo get, se dirige a las rutas /categorias, /products o endPoints y se les pasan unos parametros, callback que contiene una constante que identifica los parametros tomados por el request
  const {categoryId, productId} = req.params;
  res.json({//Respuesta en formato json
    categoryId,
    productId
  });
});*/

//-------------------------------------------------------------

router.post('/', async (req, res)=>{//Ruta con callback (Se hace uso de async await para trabajar asincronicamente)
  const body = req.body;//Ingresa a solicitud, identifica el cuerpo y lo almacena
  const newCategoria = await service.create(body);//Accede al objeto, identifica el metodo, pasa argumento y el resultado lo almacena en variable
  res.status(201).json(newCategoria);//Responde con codigo de estado (201 create) y formato json
})

//--------------------------------------------

router.patch('/:id', async (req, res)=>{//Ruta con parametro y callback (Se hace uso de async await para trabajar asincronicamente)
  try {//Permite trabajar las condiciones de una manera mas limpia
  const {id} = req.params;//Ingresa a la solicitud, identifica parametros y hace uso del id
  const body = req.body;//Ingresa a solicitud, identifica el cuerpo y lo almacena
  const categoria = await service.update(id, body);//Ingresa al objeto, identifica el metodo pasa argumentos y almacena el resultado
  res.json(categoria);//Respuesta en formato json
  } catch (error) {//Devuelve el error
    res.status(404).json({//Respuesta en formato json con el codigo de estado (404 error)
      message: error.message//Mensaje de error
    });
  }
});

//------------------------------------------------------------------

router.delete('/:id', async (req, res)=>{//Ruta con parametro y callback (Se hace uso de async await para trabajar asincronicamente)
  const {id} = req.params;//Ingresa a la solicitud, identifica parametros y hace uso del id
  const categoria = await service.delete(id)//Ingresa al objeto, identifica metodo, pasa argumento y almacena resultado
  res.json(categoria);//Respuesta en formato json
})

//---------------------------------------------------

module.exports = router;//Exportamos modulo router
