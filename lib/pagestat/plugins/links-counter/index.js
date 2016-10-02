'use strict';

const url = require('url');
const cheerio = require('cheerio');

const version = "0.0.1";
const name = "LinksCounter plugin";

class LinksCounter {
  constructor () {}

  static create() {
    console.log('=>', LinksCounter.version);
    return LinksCounter;
  }

  static get version() {
    return `${name} v:${version}`;
  }

  static getUnique(items) {
    return items.filter((item, index) => items.indexOf(item) === index);
  }

  static getStats(items) {
    const unique = LinksCounter.getUnique(items);
    return {
      total: items,
      totalCount: items.length,
      unique: unique,
      uniqueCount: unique.length
    };
  }

  static process(pageObj) {
    const pageUrlParsed = url.parse(pageObj.url);
    const pageHostname = pageUrlParsed.hostname;
    const pagePathname = pageUrlParsed.pathname;

    const $ = cheerio.load(pageObj.body);

    const resolvedLinks = [].slice.call($('a'))
      .map(tag => tag.attribs.href)
      .filter(link => !!link)
      .map(link => url.resolve(pageObj.url, link));

    const samePage = [], sameDomain = [], otherDomain = [];

    resolvedLinks.forEach((link) => {
      const resolvedLinkParsed = url.parse(link);
      const resolvedLinkHostname = resolvedLinkParsed.hostname;
      const resolvedLinkPathname = resolvedLinkParsed.pathname;

      if (pagePathname === resolvedLinkPathname) {
        samePage.push(link);
      } else if (pageHostname === resolvedLinkHostname) {
        sameDomain.push(link);
      } else {
        otherDomain.push(link);
      }
    });

    return {linksCounter: {
      samePage: LinksCounter.getStats(samePage),
      sameDomain: LinksCounter.getStats(sameDomain),
      otherDomain: LinksCounter.getStats(otherDomain)
    }};
  }
}

module.exports = LinksCounter;
