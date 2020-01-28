const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');
const { promisify } = require('util');
const ofx = require('ofx');

const readFile = promisify(fs.readFile);
const { createTransaction, getAccount } = require('./lib');

function ofxParser(data) {
  const raw = ofx.parse(data);
  return raw.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map(
    rawTransaction => {
      const rawDate = rawTransaction.DTPOSTED;
      return {
        date: new Date(
          [rawDate.slice(0, 4), rawDate.slice(4, 6), rawDate.slice(6, 8)].join(
            '-'
          )
        ).toISOString(),
        amount: Number(rawTransaction.TRNAMT),
        description: rawTransaction.NAME,
      };
    }
  );
}

function csvParser(data) {
  const raw = csvjson.toObject(data, {
    delimiter: ';',
    wrap: false,
  });
  return raw;
}

(async () => {
  const inPath = path.resolve(
    __dirname,
    '../../private/_transformed_tandem_transactions.csv'
  );

  const rawData = await readFile(inPath, 'utf8');
  const extension = path.extname(inPath);
  const parser = extension === '.ofx' ? ofxParser : csvParser;

  const toAccount = await getAccount({
    name: 'Tandem',
  });

  const parsedJson = parser(rawData).map(t => ({
    ...t,
    toAccount,
  }));

  console.log(parsedJson);

  const proms = parsedJson.map(async t => {
    await createTransaction(t);
    return;
  });
  await Promise.all(proms);

  const created = proms.filter(x => x).length;
  const skipped = proms.length - created;

  console.log(`Created ${created} records`);
  console.log(`Skipped ${skipped} records`);
})();
