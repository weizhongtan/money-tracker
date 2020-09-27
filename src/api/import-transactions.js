const fs = require('fs');
const csvjson = require('csvjson');
const path = require('path');
const { promisify } = require('util');
const ofx = require('ofx');

const readFile = promisify(fs.readFile);
const { createTransaction } = require('./lib');

const picked = [];
const recursivePickBy = (key, val) => {
  if (key === 'STMTTRN') {
    picked.push(val);
  } else if (Array.isArray(val)) {
    val.forEach((o) => recursivePickBy(null, o));
  } else if (val && typeof val === 'object' && val.constructor === Object) {
    Object.entries(val).forEach(([_key, _val]) => {
      recursivePickBy(_key, _val);
    });
  }
};

async function ofxParser(data) {
  const raw = ofx.parse(data);
  recursivePickBy(null, raw);
  console.log({ raw });
  return picked.flat().map((rawTransaction, index) => {
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
  });
}

function csvParser(data) {
  const raw = csvjson.toObject(data, {
    delimiter: ';',
    wrap: false,
  });
  return raw;
}

function qifParser(data) {
  console.log(data);
}

const parsers = {
  ofx: ofxParser,
  qfx: ofxParser,
  csv: csvParser,
  qif: qifParser,
};

const pathname = '/Users/wzt/Downloads/amex.qfx';
const accountId = '8d296146-8d6a-4dbc-b2ec-8dd772bf3654';

(async () => {
  const inPath = path.resolve(__dirname, pathname);

  const rawData = await readFile(inPath, 'utf8');
  const extension = path.extname(inPath);
  const parser = parsers[extension.substring(1)];

  const data = await parser(rawData);
  if (!data || !data.length) {
    throw new Error('parser return nothing!');
  }

  const parsedJson = data.map((t) => ({
    ...t,
    accountId,
  }));

  console.log('parsedJson');
  console.log(parsedJson);

  const proms = parsedJson.map((t) => {
    return createTransaction(t);
  });
  const results = await Promise.all(proms);

  const created = results.filter((x) => x).length;
  const skipped = results.length - created;

  console.log(`Created ${created} records`);
  console.log(`Skipped ${skipped} records`);
})();
