'use strict';

require('../support/bootstrap');

const statObject = require('./fixtures/statobjects/blog.sigman.pl.json');
const statObjectParsed = JSON.stringify(statObject, null, 2);
const filePath = 'blog.sigman.pl/posts/creating-command-line-tools-with-nodejs.html';
const workFolder = 'temp';
const fullPath = workFolder + '/' + filePath;
const dirName = 'temp/blog.sigman.pl/posts';

describe('StoreFS', function() {
  beforeEach(function() {
    this.pathStub = this.sandbox.stub({
      join: () => {},
      dirname: () => {}
    });

    this.mkdirpStub = this.sandbox.stub();

    this.fsStub = this.sandbox.stub({
      writeFile: () => {},
      readFile: () => {}
    });

    this.StoreFS = this.proxyquire('../../lib/pagestat/store-fs', {
      fs: this.fsStub,
      path: this.pathStub,
      mkdirp: this.mkdirpStub
    });

    this.pathStub.join
      .withArgs(workFolder,filePath)
      .returns(fullPath);
  });

  describe('#save(filePath, obj)', function() {
    beforeEach(function() {
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

  describe('#load(filePath)', function() {
    beforeEach(function() {
      this.storeFS = new this.StoreFS();
    });

    it('should load file and return contents' ,function() {
      this.fsStub.readFile
        .withArgs(fullPath, 'utf8')
        .yields(null, statObject);

      return this.storeFS
        .load(filePath, 'utf8')
        .should.be.fulfilled
        .then(res => {
          res.should.deep.equal(statObject);
          this.pathStub.join.should.have.been.calledOnce;
          this.fsStub.readFile.should.have.been.calledOnce;
        })
    });

    it('should return null if a file is missing', function() {
      // Below is wrong as this is async method returning Error
      // as first arg to callback rather then throwing errors like sync methods.
      // this.fsStub.readFile
      //   .withArgs(fullPath, 'utf8')
      //   .throws({code: 'ENOENT'});

      this.fsStub.readFile
        .withArgs(fullPath, 'utf8')
        .yields({code: 'ENOENT'});

      return this.storeFS
        .load(filePath, 'utf8')
        .should.be.fulfilled
        .then(res => {
          should.not.exist(res);
          should.equal(res, null);
          this.pathStub.join.should.have.been.calledOnce;
          this.fsStub.readFile.should.have.been.calledOnce;
        })
    });

    it('should reject the promise if error is anything but ENOENT', function() {
      // Error: EACCES, permission denied
      const eaccessError = {code: 'EACCES'}
      this.fsStub.readFile
        .withArgs(fullPath, 'utf8')
        .yields(eaccessError);

      return this.storeFS
        .load(filePath, 'utf8')
        .should.be.rejected
        .then(res => {
          res.should.deep.equal(eaccessError);
          this.pathStub.join.should.have.been.calledOnce;
          this.fsStub.readFile.should.have.been.calledOnce;
        })
    });

  });

});
