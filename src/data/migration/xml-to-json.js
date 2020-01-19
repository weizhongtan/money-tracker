const { parseString } = require('xml2js');
const path = require('path');
const fs = require('fs');

const inPath = path.resolve(__dirname, '../../private/Bank.xhb');
const xml = fs.readFileSync(inPath);

parseString(xml, (err, json) => {
  const transformed = json;
  fs.writeFileSync(
    path.resolve(__dirname, '../../private/bank.json'),
    JSON.stringify(transformed, null, 2)
  );
});
