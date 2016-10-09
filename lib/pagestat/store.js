'use strict';

/**
 * Interface for data storage providers
 */
class Store {

  constructor(provider) {
    this.provider = provider;
  }

  // static create(provider) {
  //   return new Store(provider);
  // }

  /**
   * save - saves JS object to a path
   *
   * @param  {string} filePath path that will be used to load the same object later
   * @param  {object} obj      object to save
   * @return {Promise}
   */
  save(filePath, obj) {
    return this.provider.save(filePath, obj);
  }

  /**
   * load - loads saved object from a path
   *
   * @param  {type} filePath path to load the object with statistics
   * @return Promise<object, Error> return promise with object with staticts
   */
  load(filePath) {
    return this.provider.load(filePath);
  }

}

module.exports = Store;
