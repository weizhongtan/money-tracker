module.exports = (sequelize, Sequelize) => {
  class SplitTransaction extends Sequelize.Model {}
  return SplitTransaction.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      amount: {
        type: Sequelize.MONEY,
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
};
