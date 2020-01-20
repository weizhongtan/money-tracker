const { connectAndSync, addExistingData } = require('../lib');
const data = require('../../../private/bank');

(async () => {
  await connectAndSync(true);
  await addExistingData(data);
})();
