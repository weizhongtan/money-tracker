module.exports = (sequelize, Sequelize) => {
  class Transaction extends Sequelize.Model {}
  return Transaction.init(
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
        type: Sequelize.MONEY,
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
        type: Sequelize.ARRAY(Sequelize.MONEY),
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
};
