'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('es6-promisify');

const mkdirp = promisify(require('mkdirp'));
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

// location where files are dropped
const workFolder = 'temp';

class StoreFS {

  constructor() {

  }

  // static create() {
  //   return new StoreFS();
  // }


  /**
   * save - Saves object to a directory and file named after filePath.
   *        Converts object to JSON before saving.
   *
   * @param  {string} filePath path to a file (directories and file name)
   * @param  {object} obj      object to save
   * @return {Promise}          description
   */
  save(filePath, obj) {
    let parsedObj = JSON.stringify(obj, null, 2);
    let fullPath = path.join(workFolder, filePath);
    console.log('workFolder', workFolder, 'filePath', filePath, 'fullPath', fullPath);
    console.log('dirname', path.dirname(fullPath));
    return mkdirp(path.dirname(fullPath))
      .then(() => writeFile(fullPath, parsedObj));
  }


  /**
   * load - Loads the object.
   *
   * @param  {type} filePath description
   * @return {Promise}
   * @resolves {object} content of the file
   * @rejects {Error}
   */
  load(filePath) {
    var fullPath = path.join(workFolder, filePath);
    return readFile(fullPath, 'utf8')
      .then(body => {
        console.log(`==> There is a following file: ${body}`);
        return body;
      })
      .catch(err => {
        if (err.code !== 'ENOENT') {
          throw err;
        }
        return null;
      });
  }

}

module.exports = StoreFS;
