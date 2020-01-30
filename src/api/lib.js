const Sequelize = require('sequelize');
const { connect, Account, Category, Transaction } = require('./model');
const moment = require('moment');

exports.connectAndSync = async (force = false) => {
  const sequelize = await connect();
  // overrides existing models
  await sequelize.sync({ force });
};

exports.getAccount = async where =>
  Account.findOne({
    where,
  });

exports.createTransaction = async ({
  date,
  amount,
  description,
  toAccount,
}) => {
  // search for any transaction with a date of 3 days either side,
  // the same amount, to the same account
  const startDate = moment(date)
    .subtract(3, 'days')
    .toISOString();
  const endDate = moment(date)
    .add(3, 'days')
    .toISOString();
  const existing = await Transaction.findOne({
    where: {
      date: {
        [Sequelize.Op.gte]: startDate,
        [Sequelize.Op.lte]: endDate,
      },
      amount: {
        [Sequelize.Op.eq]: amount,
      },
      to_account_id: toAccount.id,
    },
  });
  if (existing) {
    console.error(`Transaction already exists: ${existing.id}`);
    return false;
  }
  const transaction = await Transaction.build({
    date,
    amount,
    description,
  });
  transaction.setToAccount(toAccount, { save: false });
  await transaction.save();
  return true;
};

exports.createHomebankTransaction = async t => {
  // split transactions
  if (t.scat) {
    const split = s => s.split('||').filter(x => x);
    const categories = split(t.scat);
    const amounts = split(t.samt);
    const descriptions = split(t.smem);

    // creates new split transaction rows for each category/amount/description combo
    await Promise.all(
      categories.map(async legacyKey => {
        const splitTransaction = Transaction.build({
          date: new Date(Number(t.date)),
          amount: amounts.shift(),
          // default to main description
          description: descriptions.shift() || t.wording,
        });

        const category = await Category.findOne({
          where: {
            legacy_key: legacyKey,
          },
        });
        splitTransaction.setCategory(category, { save: false });

        const toAccount = await Account.findOne({
          where: {
            legacy_key: t.account,
          },
        });
        splitTransaction.setToAccount(toAccount, { save: false });

        await splitTransaction.save();
      })
    );
    return;
  }

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

  // transactions with dst_account are internal transfers
  if (t.dst_account) {
    const fromAccount = await Account.findOne({
      where: {
        legacy_key: t.dst_account,
      },
    });
    transaction.setFromAccount(fromAccount, { save: false });
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

  const categories = [];
  const subCategories = [];
  data.cat.forEach(c => {
    // if it has no parents, it's a category
    if (!c.parent) {
      categories.push(c);
    } else {
      subCategories.push(c);
    }
  });

  // create all categories first
  await Promise.all(
    categories.map(c => {
      return Category.create({
        name: c.name,
        legacy_key: c.key,
        // for categories, flag '2' represents income
        type: c.flags === '2' ? 'income' : 'expense',
      });
    })
  );
  // then sub categories
  await Promise.all(
    subCategories.map(async c => {
      const sc = Category.build({
        name: c.name,
        legacy_key: c.key,
        // dont set income/expense on child categories
      });
      const parent = await Category.findOne({
        where: {
          legacy_key: c.parent,
        },
      });
      console.log('found parent:', parent.id);
      sc.setParentCategory(parent, { save: false });
      await sc.save();
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
