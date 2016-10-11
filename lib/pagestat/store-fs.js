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
    const parsedObj = JSON.stringify(obj, null, 2);
    const fullPath = path.join(workFolder, filePath);
    const dirName = path.dirname(fullPath);

    return mkdirp(dirName)
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
        //console.log(`==> There is a following file: ${body}`);
        //console.log('==> File exists');
        return body;
      })
      .catch(err => {
        if (err.code !== 'ENOENT') {
          //console.log('==> There is some other error reading a file');
          throw err;
        }
        //console.log('==> File doesn\'t exist');
        return null;
      });
  }

}

module.exports = StoreFS;
