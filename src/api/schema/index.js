const Sequelize = require('sequelize');
const { AccountInit, CategoryInit, TransactionInit } = require('./models');
const customTypes = require('./types');
const DataTypes = Object.assign({}, Sequelize, customTypes);

const sequelize = new Sequelize('moneytracker', 'wzt', '', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const Account = AccountInit(sequelize, DataTypes);
const Category = CategoryInit(sequelize, DataTypes);
const Transaction = TransactionInit(sequelize, DataTypes);

Transaction.belongsTo(Account, { as: 'FromAccount' });
Transaction.belongsTo(Account, { as: 'ToAccount' });

Transaction.belongsTo(Category);

Transaction.hasOne(Transaction, { as: 'PairedWith' });

Category.belongsTo(Category, { as: 'ParentCategory' });

const connect = () =>
  sequelize
    .authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.');
      return sequelize;
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

exports.connect = connect;
exports.Account = Account;
exports.Category = Category;
exports.Transaction = Transaction;
