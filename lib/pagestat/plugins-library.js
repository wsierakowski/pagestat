'use strict';

class PluginsLibrary {
  constructor() {
    this._plugins = [];
  }

  static create() {
    if (!PluginsLibrary._instance) {
      PluginsLibrary._instance = new PluginsLibrary();
    }
    return PluginsLibrary._instance;
  }

  register(plugin) {
    this._plugins.push(plugin);
  }

  get plugins() {
    return this._plugins;
  }

}

module.exports = PluginsLibrary;
