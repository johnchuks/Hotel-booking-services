require('dotenv').config();

module.exports = {
  'development': {
    'use_env_variable': 'DATABASE_URL',
    'dialect': 'postgres'
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
}
