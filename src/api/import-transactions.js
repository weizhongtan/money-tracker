const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');
const { promisify } = require('util');
const ofx = require('ofx');

const readFile = promisify(fs.readFile);
const { createTransaction } = require('./lib');

function ofxParser(data) {
  const rawOfx = ofx.parse(data);
  return rawOfx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
    rawTransaction => {
      const rawDate = rawTransaction.DTPOSTED;
      return {
        date: [
          rawDate.slice(0, 4),
          rawDate.slice(4, 6),
          rawDate.slice(6, 8),
        ].join('-'),
        amount: rawTransaction.TRNAMT,
        description: rawTransaction.NAME,
        toAccountId: 'd74c8541-013e-4b2d-a33b-32704e921b20',
      };
    }
  );
}

async function csvParser(data) {
  return csvjson.toObject(data, {
    delimiter: ';',
    wrap: false,
  });
}

(async () => {
  const inPath = path.resolve(
    __dirname,
    '../../private/Statement Download 2019-Dec-21 21-09-15.ofx'
  );

  const rawData = await readFile(inPath, 'utf8');
  const extension = path.extname(inPath);
  const parser = extension === '.ofx' ? ofxParser : csvParser;

  const parsedJson = parser(rawData);

  console.log(parsedJson);

  await Promise.all(
    parsedJson.map(async t => {
      await createTransaction(t);
    })
  );
})();
