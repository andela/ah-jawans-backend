

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    username: 'johnDoe',
    firstName: 'john',
    lastName: 'Doe',
    email: 'michael.nzube@andela.com',
    password: 'hashing',
    following: true,
    bio: 'bios',
    image: 'image'
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
