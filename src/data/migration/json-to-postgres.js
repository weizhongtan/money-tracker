const { connect, sync, addExistingData } = require('../lib');
const data = require('../../../private/bank');

(async () => {
  await connect();
  await sync(true);
  await addExistingData(data);
})();
