const dotenv = require('dotenv');

dotenv.config();

module.exports = { development: { use_env_variable: 'DEV_DATABASE_URL',
  logging: false },
staging: { use_env_variable: 'DATABASE_URL', },
test: { use_env_variable: 'TEST_DATABASE_URL',
  logging: false, } };
