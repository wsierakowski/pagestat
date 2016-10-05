'use strict';

const Utils = require('../../lib/pagestat/utils');

const correctUrls = {
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
    'path': 'http://domain.tld/path'
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

describe('Utils', function() {
  beforeEach(function() {
    this.utils = Utils;
  });

  describe('#urlToFilePath(filePath)', function() {
    context('positive scenarios', function() {
      it('should convert urls into paths and add html extensions', function() {
        Utils.urlToFilePath(correctUrls['domain'].url).should.equal(correctUrls['domain'].path);
        // for (let key in correctUrls) {
        //   console.log('[', key, ']:', correctUrls[key].url, '<->', correctUrls[key].path);
        //   Utils.urlToFilePath(correctUrls[key].url).should.equal(correctUrls[key].path);
        // }
      });
    });
  });

});
