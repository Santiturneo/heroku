const faker = require('faker');//Importamos faker y almacenamos

//----------------------------------------------------------

class CategoriasService {//Crear clase
  constructor(){//Metodo constructor y sus propiedades
    this.categorias = [];
    this.generate();
  }

//-----------------------------------------------------

generate(){//Funcion
  const limit = 5;//Variable constante que almacena un entero
  for (let index = 0; index < limit; index++) {//Ciclo for
    this.categorias.push({//push almacenara objetos al arreglo 100 veces gracias al ciclo for
      id: faker.datatype.uuid(),//Genera un string largo aleatoriamente
      name: faker.commerce.productName(),//Se generan nombres de productos aleatoriamente
      image: faker.image.imageUrl(),//Se genera url de imagen aleatoriamente
    });
  }
}

//------------------------------------------------------------

create(data){//Funcion con parametro
  const newCategoria = {//Variable almacena un objeto, genera id de forma randomica y procede a mostrar los datos insomnia
    id: faker.datatype.uuid(),
    ...data
  }
  this.categorias.push(newCategoria);//Agrega nuevo registro a la propiedad mediante el metodo push
  return newCategoria;//Devuelve como resultado el objeto
}

//--------------------------------------------------------

find(){//Funcion
  return new Promise((resolve, reject)=>{//Objeto promise, parametro callback que contiene 2 callbacks, funcion asincrona que a su vez tiene un callback y tiempo en milisegundos
    setTimeout(() => {
      resolve(this.categorias);
    }, 2000);
  });
}

//-----------------------------------------------

findOne(id){//Funcion con parametro
  return this.categorias.find(item => item.id === id);//Toma la propiedad, aplica metodo find para encontrar el id, callback que compara los id y luego genera el resultado
}

//-------------------------------------------------------

update(id, changes){//Funcion con 2 parametros
  const index = this.categorias.findIndex(item => item.id === id);//Toma la propiedad, aplica metodo para identificar la posicion del id, callback que entrega el id y lo almacena
  if (index===-1) {//Si index no encuentra el elemento envia un mensaje de error
    throw new Error('categoria not found');
  }
  const categoria = this.categorias[index];//Toma la propiedad, identifica posicion y la almacena
  this.categorias[index]={//Toma la propiedad, identifica la posicion, indica que quiere que persistan todos los atributos y que se generen todos los cambios
    ...categoria,
    ...changes
  };
  return this.categorias[index];//Toma la propiedad, identifica posicion y la entrega como resultado
}

//-----------------------------------------------------------

delete(id){//Funcion con parametro
  const index = this.categorias.findIndex(item => item.id === id);//Aplicara metodo findIndex a la propiedad para encontrar la posicion del id y almacenarla en la variable constante
  if (index===-1) {//Si index no encuentra el elemento envia un mensaje de error
    throw new Error('categoria not found');
  }
  this.categorias.splice(index, 1);//Toma la propiedad, aplica metodo para eliminar la posicion y el elemento
  return {id};//Entrega como resultado el parametro que fue eliminado
}
}

//-----------------------------------------------------

module.exports = CategoriasService;//Exportamos el modulo
