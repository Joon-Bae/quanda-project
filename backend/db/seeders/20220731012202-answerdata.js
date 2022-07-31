'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Answers', [
    {
      userId:1,
      questionId:1,
      answer:"The mandalorian is a outlaw that takes any job that will pay. He meets a cute baby yoda and his mission changes.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId:3,
      questionId:2,
      answer:"Signal and Mr.Sunshine are good korean dramas to start.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId:3,
      questionId:3,
      answer:"It depends ultimately on how much time and effort you put into it. Also, it might depend on what your first language is.",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Answers', null, {});
  }
};
