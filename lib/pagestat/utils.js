'use strict';

const path = require('path');
const urlParse = require('url').parse;
const slug = require('slug');

class Utils {
  static urlToFilePath(filePath) {
    const pathParsed = urlParse(filePath);

    let pathPieces = pathParsed.path
      .split('/')
      .filter(v => !!v)
      .map(v => slug(v));

    pathPieces.unshift(pathParsed.hostname);
    console.log('==>', pathPieces)
    return path.join.apply(null, pathPieces) + '.html';
  }
}

module.exports = Utils;
