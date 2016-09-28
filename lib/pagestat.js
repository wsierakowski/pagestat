'use strict';

const Main = require('./pagestat/main');

let main = new Main();

//main.testReadFile();

//main.testSaveFile();

main.registerPlugin({process: function() {
  console.log('running first plugin');
  return {raz: 'dwa'};
}});

main.registerPlugin({process: function() {
  console.log('running second plugin');
  return {trzy: 'cztery'};
}});

main.getPageStats('http://google.com/grzyb/jest/wielki/dwa/babelki')
  .then(() => console.log('Finished.'))
  .catch((err) => console.log('Oops, error:', err));
