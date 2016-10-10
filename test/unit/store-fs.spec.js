'use strict';

require('../support/bootstrap');

const statObject = require('./fixtures/statobjects/blog.sigman.pl.json');
const statObjectParsed = JSON.stringify(statObject, null, 2);
const filePath = 'blog.sigman.pl/posts/creating-command-line-tools-with-nodejs.html';
const workFolder = 'temp';
const fullPath = workFolder + '/' + filePath;
const dirName = 'temp/blog.sigman.pl/posts';

describe('StoreFS - stub', function() {
  beforeEach(function() {
    this.pathStub = this.sandbox.stub({
      join: () => {},
      dirname: () => {}
    });

    this.mkdirpStub = this.sandbox.stub();

    this.fsStub = this.sandbox.stub({
      writeFile: () => {}
    });

    this.StoreFS = this.proxyquire('../../lib/pagestat/store-fs', {
      fs: this.fsStub,
      path: this.pathStub,
      mkdirp: this.mkdirpStub
    });
  });

  describe('#save(filePath, obj)', function() {
    beforeEach(function() {
      this.pathStub.join
        .withArgs(workFolder,filePath)
        .returns(fullPath);

      this.pathStub.dirname
        .withArgs(fullPath)
        .returns(dirName);

      this.mkdirpStub
        .withArgs(dirName)
        .yields(null);

      this.fsStub.writeFile
        .withArgs(fullPath, statObjectParsed)
        .yields(null);

      this.storeFS = new this.StoreFS();
    });

    it('should save obj to a file in directory and return fulfilled promise', function() {
      return this.storeFS
        .save(filePath, statObject)
        .should.be.fulfilled
        .then(res => {
          should.not.exist(res);
          this.pathStub.join.should.have.been.calledOnce;
          this.pathStub.dirname.should.have.been.calledOnce;
          this.mkdirpStub.should.have.been.calledOnce;
          this.fsStub.writeFile.should.have.been.calledOnce;
          //this.mkdirpStub.should.have.been.calledWith(workFolder, filePath);
        });
    });

  });

});
