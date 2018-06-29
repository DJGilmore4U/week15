module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['withdrawal', 'deposit']]
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Account, {
      foreignKey: {
        allowNull: false
      }
    })
  };

  return Transaction;
};
