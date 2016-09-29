'use strict';

const cheerio = require('cheerio');

class LinksCounter {
  constructor () {}

  static create() {
    return LinksCounter;
  }

  static process(pageObj) {
    const $ = cheerio.load(pageObj.body);

  }
}

module.exports = LinksCounter;
