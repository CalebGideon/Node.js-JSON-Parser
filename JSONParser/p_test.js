var path = "./data/step4/valid.json";
const {Parse} = require('jsonparser');
const fs = require('fs');
fs.readFile(path, 'utf8', (err, data) => {
if(err) {
  console.error(err);
  return;
}
var parsed = Parse(data);
console.log(parsed);
});