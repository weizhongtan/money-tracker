const { parseString } = require('xml2js');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v4');

const inPath = path.resolve(__dirname, '../../private/Bank.xhb');
const xml = fs.readFileSync(inPath);

parseString(xml, (err, original) => {
  // all transformation are applied to tmp
  let tmp = original.homebank;

  // remove $ keys
  Object.keys(tmp).forEach((key, val) => {
    if (Array.isArray(tmp[key])) {
      tmp[key] = tmp[key].map(thing => {
        return thing.$;
      });
    }
  });

  // julian date conversion
  const c = -62135640000000;
  const x = 86400000;
  tmp.ope = tmp.ope.map(t => {
    t.date = String(t.date * x + c);

    if (!t.kxfer) {
      return t;
    }

    // link up kxfer (key transfer) transactions using pair ids
    const id = uuid();
    const otherTransaction = tmp.ope.find(x => x.kxfer === t.kxfer);
    t.paired = id;
    otherTransaction.paired = id;
    return t;
  });

  fs.writeFileSync(
    path.resolve(__dirname, '../../private/bank.json'),
    JSON.stringify(tmp, null, 2)
  );
});
