const express = require('express');//Importar y almacenar
const ProductosService = require('./../services/productos.service');//Importar y almacenar
//const validatorHandler = require('./../middlewares/validator.handler');//Importar y almacenar
//const {createProductSchema, updateProductSchema, getProductSchema}=require('./../schemas/productos.schemas')//Importar y almacenar

//-------------------------------------------------

const router = express.Router();//Identificamos a Router como express y lo almacenamos en variable constante
const service = new ProductosService();//Instanciamos el objeto

//-----------------------------------------------

router.get('/', async (req, res) => {//Express utiliza metodo get, se dirige a la ruta por defecto o endPoint y tiene un callback. Se aplica async await para trabajar de manera asincrona (ejecutar simultaneamente)
  const products = await service.find();//Ingresa al objeto, identifica el metodo y lo asigna a variable constante
  res.json(products);//Entrega respuesta en formato json
});

//-----------------------------------------------------------

router.get('/filter', (req, res) =>{//Express utiliza metodo get, se dirige a la ruta especifica, callback que imprime un string
  res.send('Yo soy un filter');
})

//----------------------------------------------------------

router.get('/:id',//Ruta y parametro
//validatorHandler(getProductSchema, 'params'),//Validar la informacion
async (req, res) =>{//Callback. Se aplica async await para trabajar de manera asincrona (ejecutar simultaneamente)
  //try {//Permite trabajar condicionales de una manera mas limpia
  const {id}=req.params;//id es igual a parametro encontrado en la solicitud
  const product = await service.findOne(id);//Accede al objeto, identifica metodo y envia como argumento el parametro id
  res.json(product);//Respuesta en formato json
  /*} catch (error) {//Se ejecuta si lo anterior no lo hace
    next(error);//Ejecuta middleware de tipo error
  }*/
})

//-----------------------------------------------------------

router.post('/',//Ruta
//validatorHandler(createProductSchema, 'body'),//Validar la informacion
async (req, res)=>{//Callback. Se aplica async await para trabajar de manera asincrona (ejecutar simultaneamente)
  const body = req.body;//body es igual a datos insomnia encontrados en la solicitud
  const newProduct = await service.create(body);//Accede al objeto, identifica metodo create, le pasa body(datos insomnia) y almacena en variable
  res.status(201).json(newProduct);//Responde con codigo de estado(201 create) y variable en formato json
})

//-------------------------------------------------------------

/*router.patch('/:id', async (req, res)=>{//router hace uso del metodo http patch (actualizar parcialmente), ruta, parametro y callback. Se aplica async await para trabajar de manera asincrona (ejecutar simultaneamente)
  const {id} = req.params;//id es igual a un parametro encontrado en la solicitud
  const body = req.body;//body es igual a datos insomnia almacenados en la solicitud
  const product = await service.update(id, body);//Ingresamos al objeto, identificamos el metodo pasamos argumentos
  res.json(product);//Respuesta en formato json
})*/

router.patch('/:id',
//validatorHandler(getProductSchema, 'params'),//Validar la informacion
//validatorHandler(updateProductSchema, 'body'),//Validar la informacion
async (req, res)=>{//Express hace uso del metodo patch (actualizar), agrega ruta, parametro y callback. Se aplica async await para trabajar de manera asincrona (ejecutar simultaneamente) y se adecua para trabajar como middleware de tipo error
  //try {//Permite trabajar las condiciones de una manera mas limpia
  const {id} = req.params;//id es igual a un parametro encontrado en la solicitud
  const body = req.body;//body es igual a datos insomnia almacenados en la solicitud
  const product = await service.update(id, body);//Ingresamos al objeto, identificamos el metodo y pasamos argumentos
  res.json(product);//Respuesta en formato json
  /*} catch (error) {//Devuelve el error
    next(error);//Ejecuta un middleware de tipo error
  }*/
});

//------------------------------------------------------------------

router.delete('/:id', async (req, res)=>{//router hace uso del metodo http delete, ruta, parametro y callback. Se aplica async await para trabajar de manera asincrona (ejecutar simultaneamente)
  const {id} = req.params;//id es igual a un parametro encontrado en la solicitud
  const product = await service.delete(id)//Ingresa al objeto, identifica metodo y envia argumento
  res.json(product);//Respuesta en formato json
})

//--------------------------------------------------------------

module.exports = router;//Exportamos el modulo router
