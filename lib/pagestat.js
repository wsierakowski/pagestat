'use strict';

const Main = require('./pagestat/main');
const LinksCounter = require('./pagestat/plugins/links-counter');

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

main.registerPlugin(LinksCounter.create());

//const pageLink = 'http://google.com/grzyb/jest/wielki/dwa/babelki';
//const pageLink = 'https://nodejs.org/api/url.html#url_url_resolve_from_to';
const pageLink = 'http://gazeta.pl';

main.getPageStats(pageLink)
  .then((res) => {
    //let res = Object.assign({}, pageObj);
    //delete res.body;
    console.log('Finished.', res);
  })
  .catch((err) => console.log('Oops, error:', err));
