const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');
const { promisify } = require('util');
const ofx = require('ofx');

const readFile = promisify(fs.readFile);
const { createTransaction } = require('./lib');

function ofxParser(data) {
  const raw = ofx.parse(data);
  return raw.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
    (rawTransaction, index) => {
      const rawDate = rawTransaction.DTPOSTED;
      return {
        date: new Date(
          `${[
            rawDate.slice(0, 4),
            rawDate.slice(4, 6),
            rawDate.slice(6, 8),
          ].join('-')}T00:00:${String(index).padStart(2, '0')}Z`
        ).toISOString(),
        amount: Number(rawTransaction.TRNAMT),
        description: rawTransaction.NAME,
      };
    }
  );
}

function csvParser(data) {
  const raw = csvjson.toObject(data, {
    delimiter: ',',
    wrap: false,
  });
  return raw;
}

const pathname = '/Users/wzt/Downloads/finance/TANW45133441-20200516.ofx';
const accountId = '';

(async () => {
  const inPath = path.resolve(__dirname, pathname);

  const rawData = await readFile(inPath, 'utf8');
  const extension = path.extname(inPath);
  const parser = extension === '.ofx' ? ofxParser : csvParser;

  const parsedJson = parser(rawData).map(t => ({
    ...t,
    accountId,
  }));

  console.log(parsedJson);

  const proms = parsedJson.map(t => {
    return createTransaction(t);
  });
  const results = await Promise.all(proms);

  const created = results.filter(x => x).length;
  const skipped = results.length - created;

  console.log(`Created ${created} records`);
  console.log(`Skipped ${skipped} records`);
})();
