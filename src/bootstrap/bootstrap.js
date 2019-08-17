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
      type: Sequelize.STRING,
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
  { sequelize, modelName: 'account' }
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
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'category' }
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
      type: Sequelize.STRING,
      allowNull: false,
    },
    pair_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'transaction' }
);

Transaction.belongsTo(Account, { as: 'FromAccount' });
Transaction.belongsTo(Account, { as: 'ToAccount' });

Transaction.belongsTo(Category);

Transaction.hasOne(Transaction, { as: 'PairedWith' });

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');

    await Account.sync({ force: true });
    await Category.sync({ force: true });
    await Transaction.sync({ force: true });
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

        const category = await Category.findOne({
          where: {
            legacy_key: t.category,
          },
        });

        transaction.setCategory(category, { save: false });

        transaction.save();
      } catch (err) {
        errors.push(t);
      }
    });

    await Promise.all(promises);

    console.error(errors);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
