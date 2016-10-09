'use strict';

const path = require('path');
const urlParse = require('url').parse;
const slug = require('slug');

/**
* Utilities
*/
class Utils {

  /**
   * Converts url into file path
   *
   * @param {string} page url
   * @returns {string} filepath
   */
  static urlToFilePath(url) {
    const pathParsed = urlParse(url);

    let pathPieces = pathParsed.path
      .split('/')
      .filter(v => !!v)
      .map(v => slug(v));

    pathPieces.unshift(pathParsed.hostname);
    return path.join.apply(null, pathPieces) + '.html';
  }
}

module.exports = Utils;
