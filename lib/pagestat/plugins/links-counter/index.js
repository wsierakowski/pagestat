'use strict';

/*

┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘

Examples

http://domain.tld

http://domain.tld/#anchor

http://domain.tld/path

http://domain.tld/path/one/two

http://www.domain.tld

http://subdomain.domain.tld

http://subdomain1.subdomain2.domain.tld

http://subdomain1.subdomain2.domain.tld/path/one/two

*/

const url = require('url');
const cheerio = require('cheerio');
const parseDomain = require('parse-domain');

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
//      unique: unique,
      uniqueCount: unique.length
    };
  }

  static isSamePage(link1, link2) {
    // same page must be the same domain and the same path
    const link1Parsed = url.parse(link1);
    const link2Parsed = url.parse(link2);
    if (link1Parsed.pathname === link2Parsed.pathname &&
      LinksCounter.isSameHostname(link1, link2)) {
      return true;
    }
    return false;
  }

  static isSameHostname(link1, link2) {
    const link1Parsed = url.parse(link1);
    const link2Parsed = url.parse(link2);
    if (link1Parsed.host === link2Parsed.host) {
      return true;
    }
    return false;
  }

  static isSameDomain(link1, link2) {
    const link1Parsed = parseDomain(link1);
    const link2Parsed = parseDomain(link2);
    const link1Domain = link1Parsed.domain + link1Parsed.tld;
    const link2Domain = link2Parsed.domain + link2Parsed.tld;
    if (link1Domain === link2Domain) {
      return true;
    }
    return false
  }

  static getResolvedLinks(pageBody, pageUrl) {
    const $ = cheerio.load(pageBody);
    const resolvedLinks = [].slice.call($('a'))
      .map(tag => tag.attribs.href)
      .filter(link => !!link)
      .map(link => url.resolve(pageUrl, link));

    return resolvedLinks;
  }

  /*
  expect(parseDomain("some.subdomain.example.co.uk")).to.eql({
      subdomain: "some.subdomain",
      domain: "example",
      tld: "co.uk"
  });
  */

  static process(pageObj) {
    const resolvedLinks = LinksCounter.getResolvedLinks(pageObj.body, pageObj.url);

    let samePage, sameHostname = [], sameDomain = [], otherDomain = [];

    samePage = resolvedLinks
      .filter(link => {
        if (LinksCounter.isSameDomain(link, pageObj.url)) {
          sameDomain.push(link);
          return true;
        }
        otherDomain.push(link);
        return false;
      })
      .filter(link => {
        if (LinksCounter.isSameHostname(link, pageObj.url)) {
          sameHostname.push(link);
          return true;
        }
        return false;
      })
      .filter(link =>LinksCounter.isSamePage(link, pageObj.url));

    return {linksCounter: {
      samePage: LinksCounter.getStats(samePage),
      sameHostname: LinksCounter.getStats(sameHostname),
      sameDomain: LinksCounter.getStats(sameDomain),
      otherDomain: LinksCounter.getStats(otherDomain)
    }};
  }
}

module.exports = LinksCounter;
