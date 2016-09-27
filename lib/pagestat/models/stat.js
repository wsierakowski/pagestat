'use strict'

/**
* A model for the page statistic. 
* That kind of comprehensive validation isn't necessary, nevertheless doing this as an exercise.
*
* @property {string} urlDomain
* @property {string} urlPath
* @property {string} urlFileName
*
* @property {string} pageBody
* @property {date} dateDownloaded
* 
* @property {number} statNumLinksTotal
* @property {number} statNumLinksSameDomain
*/

class Stat {
  /**
  * Generate the page stat model from the provided object.
  *
  * @property {string} urlDomain
  * @property {string} urlPath
  * @property {string} urlFileName
  *
  * @property {string} pageBody
  * @property {date} dateDownloaded (read only)
  * 
  * @property {number} statNumLinksTotal
  * @property {number} statNumLinksSameDomain
  */
  constructor(object) {
    this.urlDomain = object.urlDomain;
    this.urlPath = object.urlPath;
    this.urlFileName = object.urlFileName;

    this.pageBody = object.pageBody;

    this.dateDownloaded = new Date();//object.dateDownloaded;

    this.statNumLinksTotal = object.statNumLinksTotal;
    this.statNumLinksSameDomain = object.statNumLinksSameDomain;
  }

  // TODO value validation

  get urlDomain() {
    return this._urlDomain;
  }

  set urlDomain(value) {
    if (typeof value === 'string' && value.length > 5) {
      this._urlDomain = value;
    } else {
      throw new Error(`urlDomain must be a string over ${5}`);
    }
  }

  get urlPath() {
    return this._urlPath;
  }

  set urlPath(value) {
    if (typeof value === 'string') {
      this._urlPath = value;
    } else {
      throw new Error('urlPath must be a string');
    }
  }

  get urlFileName() {
    return this._urlFileName;
  }

  set urlFileName(value) {
    if (typeof value === 'string') {
      this._urlFileName = value;
    } else {
      throw new Error('urlFileName must be a string');
    }
  }

  get url() {
    return this._urlDomain + this._urlPath + this._urlFileName;
  }

  get pageBody() {
    return this._pageBody;
  }

  set pageBody(value) {
    if (typeof value === 'string') {
      this._pageBody = value;
    } else {
      throw new Error('pageBody must be a string');
    }
  }

  get dateDownloaded() {
    return this._dateDownloaded.toJSON();
  }

  set dateDownloaded(value) {
    // TODO not good enough...
    if (typeof value === 'object') {
      this._dateDownloaded = value;
    } else {
      throw new Error('dateDownloaded must be a date object');
    }
  }

  get statNumLinksTotal() {
    return this._statNumLinksTotal;
  }

  set statNumLinksTotal(value) {
    if (typeof value === 'number') {
      this._statNumLinksTotal = value;
    } else {
      throw new Error('statNumLinksTotal must be a number');
    }
  }

  get statNumLinksSameDomain() {
    return this._statNumLinksSameDomain;
  }

  set statNumLinksSameDomain(value) {
    if (typeof value === 'number') {
      this._statNumLinksSameDomain = value;
    } else {
      throw new Error('statNumLinksSameDomain must be a number');
    }
  }

  toString() {
    return JSON.stringify({
      urlDomain: this.urlDomain,
      urlPath: this.urlPath,
      urlFileName: this.urlFileName,

      pageBody: this.pageBody,
      statNumLinksTotal: this.statNumLinksTotal,
      statNumLinksSameDomain: this.statNumLinksSameDomain
    });
  }

}

module.exports = Stat;