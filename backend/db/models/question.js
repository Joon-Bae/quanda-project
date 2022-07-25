'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User, {
      foreignKey: "userId"
    })
    Question.hasMany(models.Answer, {
      foreignKey: "questionId",
      onDelete: 'CASCADE',
      hooks: true
    })
  };
  return Question;
};
