module.exports = (sequelize, Sequelize) => {
  class Category extends Sequelize.Model {}
  return Category.init(
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
      type: {
        type: Sequelize.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'category',
    }
  );
};
