const Joi=require('joi');//Importar joi para validar datos y almacenar

//---------------------------------------------------------

const id = Joi.string().uuid();//Indica que id es un string y con uuid genera el formato
const name = Joi.string().min(3).max(15);//Indica que name es un string de entre 3 a 15 caracteres
const price = Joi.number().integer().min(10);//Indica que price es un numero entero que tiene como minimo 10 caracteres
const image = Joi.string().uri();

//-----------------------------------------------------------------

const createProductoSchema = Joi.object({//Valida objeto, indica que los campos son requeridos y almacena
  name: name.required(),
  price: price. required(),
  image: image. required(),
})

const updateProductoSchema = Joi.object({//Valida objeto y almacena
  name: name,
  price: price,
  image: image,
})

const getProductoSchema = Joi.object({//Valida objeto y almacena
  id: id.required()
})

//---------------------------------------------------------------

module.exports = {createProductoSchema, updateProductoSchema, getProductoSchema}//Exportar modulo
