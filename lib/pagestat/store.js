'use strict';

class Store {

  constructor(provider) {
    this.provider = provider;
  }

  // static create(provider) {
  //   return new Store(provider);
  // }

  save(filePath, obj) {
    let parsedObj = JSON.stringify(obj, null, 2);
    return this.provider.save(filePath, parsedObj);
  }

  load(filePath) {
    return this.provider.load(filePath);
  }

}

module.exports = Store;
