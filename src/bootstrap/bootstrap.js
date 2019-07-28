const Sequelize = require('sequelize');
const data = require('../private/data');

const transactions = data.ope.map(t => {
  t.date = new Date(Number(t.date));
  return t;
});

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
    paired_with_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'transaction' }
);

Account.hasMany(Transaction);
Account.hasMany(Transaction);

Transaction.belongsTo(Category);

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
        });
      })
    );

    await Promise.all(
      data.cat.map(c => {
        return Category.create({
          name: c.name,
        });
      })
    );

    const account = await Account.findOne({
      where: {
        name: 'Nationwide My account',
      },
    });

    // data.ope.forEach(c => {
    //   Transaction.create({
    //     name: c.name
    //   })
    // })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
