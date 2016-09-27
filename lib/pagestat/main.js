'use strict';

const fetch = require('isomorphic-fetch');

const Utils = require('./utils');

const Store = require('./store');
const StoreFS = require('./store-fs');
const PageGetter = require('./page-getter');

class Main {
  constructor() {
    this._store = new Store(new StoreFS());
  }

  getPageStats(pageURL) {
    let filePath = Utils.urlToFilePath(pageURL);
    return Promise.resolve()
      .then(() => this._store.load(filePath))
      .then(body => {
        // page was already downloaded and saved...
        if (body !== null) {
          // this is a not the right way to control the flow...
          throw body;
        }
      })
      .then(() => fetch(pageURL))
      .then(res => res.text())
      .then(pageBody => {
        //console.log(`response: ${pageBody}`);
        return this._store.save(filePath, pageBody);
      });
  }

  testReadFile() {
    this._store.load('readme.txt')
      .then(body => console.log('read file body:', body))
      .catch(err => console.log('err:', err));
  }

  testSaveFile() {
    this._store.save('readme.txt', 'jestem wielkim mega grzybem')
      .then(something => console.log('Save ok, this is what i got', something))
      .catch(err => console.log('err:', err));
  }
}

module.exports = Main;