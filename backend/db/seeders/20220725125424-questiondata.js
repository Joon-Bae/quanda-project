'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Questions', [
    {
      userId:2,
      title:"Who is the mandalorian?",
      description:"I was watching the show and I was curious about his backstory",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId:2,
      title:"What are the best korean dramas?",
      description:"I love kdramas and I would like some recommendations",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId:2,
      title:"How hard is learning a new language?",
      description:"I want to start learning Korean but I don't know where to start",
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
   return queryInterface.bulkDelete('Questions', null, {});
  }
};
