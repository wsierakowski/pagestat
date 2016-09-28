'use strict';

class Store {

  constructor(provider) {
    this.provider = provider;
  }

  // static create(provider) {
  //   return new Store(provider);
  // }

  save(filePath, obj) {
    console.log('and this is what im saving', obj);
    let parsedObj = JSON.stringify(obj);
    console.log('==================================\n\nstringified: ', parsedObj);
    return this.provider.save(filePath, parsedObj);
  }

  load(filePath) {
    return this.provider.load(filePath);
  }

}

module.exports = Store;
