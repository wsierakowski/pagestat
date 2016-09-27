'use strict';

const Main = require('./pagestat/main');

let main = new Main();

//main.testReadFile();

//main.testSaveFile();

main.getPageStats('http://google.com/grzyb/jest/wielki/dwa/babelki')
  .then(() => console.log('Finished.'));
