'use strict';

require('../support/bootstrap');

var PluginsLibrary = require('../../lib/pagestat/plugins-library');

describe('PluginsLibrary', function() {
  beforeEach(function() {
    this.pluginsLibrary = PluginsLibrary.create();
  });

  describe('::create()', function() {
    it('should return a singleton', function() {
      this.pluginsLibrary.should.deep.equal(PluginsLibrary.create());
    });
  });

  describe('#register()', function() {
    it('should add a new plugin to the plugins list', function() {
      const plugin = {process: function() {}};
      this.pluginsLibrary.register(plugin);
      this.pluginsLibrary.plugins[0].should.deep.equal(plugin);
    });

    it('should throw error when trying to add incompatible plugin', function() {
      // http://stackoverflow.com/questions/36216868/how-to-test-for-thrown-error-with-chai-should
      const plugin = {};
      should.Throw(() => this.pluginsLibrary.register(plugin), Error, /Attempt to register incompatible plugin./);
    });
  });

});
