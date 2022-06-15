const faker = require('faker');
const boom = require('@hapi/boom');

class categoriasService{

  constructor(){
    this.categorias = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.categorias.push({
        id: faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const newCategorias = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categorias.push(newCategorias);
    return newCategorias;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categorias);
      }, 5000);
    })
  }

  async findOne(id){
    const categoria = this.categorias.find(item => item.id === id);
    if (!categoria){
      throw boom.notFound('categoria not found');
    }
    if(categoria.isBlock){
      throw boom.conflict('categoria esta bloqueada ');
    }
    return categoria;
  }

  async update(id, changes){
    const index = this.categorias.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('categorias nor found');
    }
    const categoria = this.categorias[index];
    this.categorias[index] = {
      ...categoria,
      ...changes
    };
    return this.categorias[index];
  }

  async delete(id){
    const index = this.categorias.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('product nor found');
    }
    this.categorias.splice(index, 1);
    return { id };
  }

}

module.exports = categoriasService;
