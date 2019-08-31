module.exports = { up: queryInterface => queryInterface.bulkInsert('User', [{ username: 'john',
  firstName: 'kagabo',
  lastName: 'prince',
  email: 'faustin.kagabo@andela.com',
  password: '$2b$12$ohLYwcyFvN9o/fnRSd4G1.vcdNvt6SDJpiyTpOxiz38Y/wG4hNeza',
  following: true,
  bio: 'bios',
  image: 'image',
  roles: ['superAdmin'] }], {}),

down: queryInterface => queryInterface.bulkDelete('User', null, {}) };
