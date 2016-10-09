'use strict';

require('../support/bootstrap');

const Utils = require('../../lib/pagestat/utils');

const standardUrls = {
  'domain': {
    'url': 'http://domain.tld',
    'path': 'domain.tld.html'
  },
  'domain.queryStringParams': {
    'url': 'http://domain.tld/path?param=one&param2=two',
    'path': 'domain.tld/pathparamoneandparam2two.html'
  },
  'domain.anchor': {
    'url': 'http://domain.tld/#anchor',
    'path': 'domain.tld.html'
  },
  'domain.path': {
    'url': 'http://domain.tld/path',
    'path': 'domain.tld/path.html'
  },
  'domain.path.x3': {
    'url': 'http://domain.tld/path/one/two',
    'path': 'domain.tld/path/one/two.html'
  },
  'subdomain': {
    'url': 'http://subdomain.domain.tld',
    'path': 'subdomain.domain.tld.html'
  },
  'subdomain.www': {
    'url': 'http://www.domain.tld',
    'path': 'www.domain.tld.html'
  },
  'subdomain.x2': {
    'url': 'http://subdomain1.subdomain2.domain.tld',
    'path': 'subdomain1.subdomain2.domain.tld.html'
  },
  'subdomain.x2.path.x3': {
    'url': 'http://subdomain1.subdomain2.domain.tld/path/one/two',
    'path': 'subdomain1.subdomain2.domain.tld/path/one/two.html'
  },
  'subdomain.x2.path.x3.anchor': {
    'url': 'http://subdomain1.subdomain2.domain.tld/path/one/two/#anchor',
    'path': 'subdomain1.subdomain2.domain.tld/path/one/two.html'
  },
  'subdomain.x2.path.x3.queryStringParams.anchor': {
    'url': 'http://subdomain1.subdomain2.domain.tld/path/one/two/?param=one&param2=two#anchor',
    'path': 'subdomain1.subdomain2.domain.tld/path/one/two/paramoneandparam2two.html'
  }
};

const nonstandardUrls = {
  'subdomain.x2.path.x3.queryStringParams.anchor - with spaces': {
    'url': 'http://subdomain1.subdomain2.domain.tld/path/one / two /?param = one&param2 = two # an chor',
    'path': 'subdomain1.subdomain2.domain.tld/path/one20/20two20/param2020oneandparam22020two20.html'
  },
  'subdomain.x2.path.x3.queryStringParams.anchor - with ampersand': {
    'url': 'http://subdomain1.subdomain2.domain.tld/path/one/two/?&param=one&param2=two#anchor',
    'path': 'subdomain1.subdomain2.domain.tld/path/one/two/andparamoneandparam2two.html'
  },
  'subdomain.x2.path.x3.queryStringParams.anchor - with non-standard chars': {
    'url': 'http://subdomain1.subdomain2.domain.tld/path/one/t\\wo/?&p£a$r%a^m*=(o)n-e_&p+a=r@a:m;2<=>t,w?|o#anchor',
    'path': 'subdomain1.subdomain2.domain.tld/path/one/t/wo/andppoundadollarra5Emon-e_andparam23C3Etw7Co.html'
  }
};

describe('Utils', function() {
  beforeEach(function() {
    this.utils = Utils;
  });

  describe('#urlToFilePath(filePath)', function() {
    context('standard scenarios', function() {
      Object.keys(standardUrls).forEach(function(item) {
        it(`should convert url into path for "${item}" test`, function() {
          Utils.urlToFilePath(standardUrls[item].url).should.equal(standardUrls[item].path);
        });
      });
    });

    context('non-standard scenarios', function() {
      Object.keys(nonstandardUrls).forEach(function(item) {
        it(`should convert url into path for "${item}" test`, function() {
          Utils.urlToFilePath(nonstandardUrls[item].url).should.equal(nonstandardUrls[item].path);
        });
      });
    });
  });

});
