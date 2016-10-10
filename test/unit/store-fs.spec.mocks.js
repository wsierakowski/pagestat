'use strict';

require('../support/bootstrap');

const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

const statObject = require('./fixtures/statobjects/blog.sigman.pl.json');
const statObjectParsed = JSON.stringify(statObject, null, 2);
const filePath = 'blog.sigman.pl/posts/creating-command-line-tools-with-nodejs.html';
const workFolder = 'temp';
const fullPath = workFolder + '/' + filePath;
const dirName = 'temp/blog.sigman.pl/posts';

describe('StoreFS - mock', function() {
  beforeEach(function() {
    this.pathMock = this.sandbox.mock(path);
    //this.mkdirpMock = this.sandbox.mock(mkdirp);
    this.mkdirpStub = this.sandbox.stub();
    this.fsMock = this.sandbox.mock(fs);

    this.StoreFS = this.proxyquire('../../lib/pagestat/store-fs', {
      fs: this.fsMock.object,
      path: this.pathMock.object,
      //mkdirp: this.mkdirpMock
      mkdirp: this.mkdirpStub
    });
  });

  describe('#save(filePath, obj)', function() {
    it('should save obj to a file in directory and return fulfilled promise', function() {
      this.pathMock.expects('join')
        .once()
        .withExactArgs(workFolder, filePath)
        .returns(fullPath);

      this.pathMock.expects('dirname')
        .once()
        .withExactArgs(fullPath)
        .returns(dirName);

      // this.mkdirpMock.expects()
      //   .once()
      //   .withExactArgs(dirName)
      //   .yields(null);

        this.mkdirpStub
          .withArgs(dirName)
          .yields(null);

        this.fsMock.expects('writeFile')
          .once()
          //.withExactArgs(fullPath, statObjectParsed)
          .yields(null);

        this.storeFS = new this.StoreFS();

        return this.storeFS
          .save(filePath, statObject)
          .should.be.fulfilled
          .then(res => {
            should.not.exist(res);
            this.pathMock.verify();
            //this.mkdirpMock.verify();
            this.mkdirpStub.should.have.been.calledOnce;
            this.fsMock.verify();
          });
      });
    });
  });
