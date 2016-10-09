'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');

const chai = require('chai');
global.should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const nock = require('nock');

beforeEach(function() {
  this.sandbox = sinon.sandbox.create();
  this.proxyquire = proxyquire;
  this.sinon = sinon;
  this.nock = nock;
});

afterEach(function() {
  this.sandbox.restore();
});
