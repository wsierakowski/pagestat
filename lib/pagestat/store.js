'use strict';

class Store {

  constructor(provider) {
    this.provider = provider;
  }

  // static create(provider) {
  //   return new Store(provider);
  // }

  save(filePath, body) {
    return this.provider.save(filePath, body);
  }

  load(filePath) {
    return this.provider.load(filePath);
  }

}

module.exports = Store;