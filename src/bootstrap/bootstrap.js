const Sequelize = require('sequelize');
const data = require('../private/data');

const sequelize = new Sequelize('moneytracker', 'wzt', '', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const Model = Sequelize.Model;
class Transaction extends Model {}
class Account extends Model {}
class Category extends Model {}
class SplitTransaction extends Model {}

const tables = [Transaction, Account, Category, SplitTransaction];

const MONEY = Sequelize.DECIMAL(19, 2);

Account.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    legacy_key: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    initial_amount: {
      type: MONEY,
      allowNull: false,
    },
    minimum: {
      type: MONEY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'account',
  }
);

Category.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    legacy_key: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'category',
  }
);

Transaction.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    amount: {
      type: MONEY,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    pair_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    split_amount: {
      type: Sequelize.ARRAY(MONEY),
      allowNull: true,
    },
    split_description: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'transaction',
  }
);

SplitTransaction.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    amount: {
      type: MONEY,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'split_transaction',
  }
);

Transaction.belongsTo(Account, { as: 'FromAccount' });
Transaction.belongsTo(Account, { as: 'ToAccount' });

Transaction.belongsTo(Category);
Transaction.belongsToMany(Category, {
  through: SplitTransaction,
});

Transaction.hasOne(Transaction, { as: 'PairedWith' });

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');

    await tables.reduce(async (acc, table) => {
      await acc;
      return table.sync({ force: true });
    }, Promise.resolve());
    console.log('bootstrapped');

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

    const transactions = data.ope.map(t => {
      t.date = new Date(Number(t.date));
      return t;
    });

    const errors = [];

    const promises = transactions.map(async t => {
      try {
        const transaction = Transaction.build({
          date: t.date,
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
      } catch (err) {
        errors.push({
          err,
          t,
        });
      }
    });

    await Promise.all(promises);

    console.error(errors);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
