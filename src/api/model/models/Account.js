module.exports = (sequelize, Sequelize) => {
  class Account extends Sequelize.Model {}
  return Account.init(
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
        type: Sequelize.MONEY,
        allowNull: false,
      },
      minimum: {
        type: Sequelize.MONEY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'account',
    }
  );
};
