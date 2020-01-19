const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const { createTransaction } = require('./lib');

(async () => {
  const inPath = path.resolve(__dirname, '../../private/marcus.csv');
  const csvData = await readFile(inPath, { encoding: 'utf8' });
  const jsonData = csvjson.toObject(csvData, {
    delimiter: ';',
    wrap: false,
  });
  await Promise.all(
    jsonData.map(async d => {
      console.log(d);
      await createTransaction({
        date: d.date,
        amount: d.amount,
        description: d.memo,
        toAccountId: 'cff1d620-9c3e-47b1-a395-7b5682dd3f02',
      });
    })
  );
})();
