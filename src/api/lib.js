const { connect, Account, Category, Transaction } = require('./model');

exports.connectAndSync = async (force = false) => {
  const sequelize = await connect();
  // overrides existing models
  await sequelize.sync({ force });
};

exports.createTransaction = async ({
  date,
  amount,
  description,
  toAccountId,
}) => {
  const transaction = await Transaction.findOne({
    where: {
      date: new Date(date),
      amount,
      to_account_id: toAccountId,
    },
  });
  if (transaction) {
    console.log('similar transaction already exists');
  } else {
    await Transaction.create({
      date: new Date(date),
      amount,
      description,
      to_account_id: toAccountId,
    });
  }
};

exports.createHomebankTransaction = async t => {
  const transaction = Transaction.build({
    date: new Date(Number(t.date)),
    amount: t.amount,
    description: t.wording,
    pair_id: t.paired,
  });

  const toAccount = await Account.findOne({
    where: {
      legacy_key: t.account,
    },
  });
  transaction.setToAccount(toAccount, { save: false });

  if (t.dst_account) {
    const fromAccount = await Account.findOne({
      where: {
        legacy_key: t.dst_account,
      },
    });
    transaction.setFromAccount(fromAccount, { save: false });
  }

  // split transaction
  if (t.scat) {
    const split = s => s.split('||').filter(x => x);
    const categories = split(t.scat);
    const amounts = split(t.samt);
    const descriptions = split(t.smem);
    await Promise.all(
      categories.map(async legacyKey => {
        const category = await Category.findOne({
          where: {
            legacy_key: legacyKey,
          },
        });
        transaction.addCategory(category, {
          through: {
            amount: amounts.shift(),
            // default to main description
            description: descriptions.shift() || t.wording,
          },
          save: false,
        });
      })
    );
  }

  if (t.category) {
    const category = await Category.findOne({
      where: {
        legacy_key: t.category,
      },
    });
    transaction.setCategory(category, { save: false });
  }

  await transaction.save();
};

exports.addExistingData = async data => {
  await Promise.all(
    data.account.map(a => {
      return Account.create({
        name: a.name,
        initial_amount: a.initial,
        minimum: a.minimum,
        legacy_key: a.key,
      });
    })
  );

  await Promise.all(
    data.cat.map(c => {
      return Category.create({
        name: c.name,
        legacy_key: c.key,
      });
    })
  );

  const errors = [];

  await Promise.all(
    data.ope.map(async t => {
      try {
        exports.createHomebankTransaction(t);
      } catch (err) {
        errors.push({
          err,
          t,
        });
      }
    })
  );

  if (errors.length) {
    console.error('################## ERRORS ##################');
    console.error(errors);
  }
};
