'use strict';

const fs = require('fs');
const path = require('path');

const promisify = require('es6-promisify');
const mkdirp = promisify(require('mkdirp'));

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

class StoreFS {

  constructor() {

  }

  // static create() {
  //   return new StoreFS();
  // }

  save(filePath, body) {
    return mkdirp(path.dirname(filePath))
      .then(() => writeFile(filePath, body));
  }

  load(filePath) {
    return readFile(filePath, 'utf8')
      .then(body => {
        console.log(`==> There is a following file: ${body}`);
        return body;
      })
      .catch(err => {
        if (err.code !== 'ENOENT') throw err;
        return null;
      });
  }

}

module.exports = StoreFS;