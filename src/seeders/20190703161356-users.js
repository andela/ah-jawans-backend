

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('User', [{
    username: 'johnDoe',
    firstName: 'john',
    lastName: 'Doe',
    email: 'michael.nzube@andela.com',
    password: 'hashing',
    following: true,
    bio: 'bios',
    image: 'image'
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('User', null, {})
};
