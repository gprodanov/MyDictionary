import Sequelize from 'sequelize';
import config from 'config';
import User from './UserModel';
import * as userUtils from './UserUtils';

const sequelize = new Sequelize(config.sqlDb.connectionString, config.sqlDb.oprions);
const users = new User(sequelize);

async function getAll() {
  let error;
  let result;
  try {
    const usersData = await users.getAll();
    result = usersData.map(user => userUtils.getPublicUser(user));
  } catch (err) {
    // TODO throw custom error
    error = err;
  }
  return [error, result];
}

async function getById(userMail) {
  let error;
  let result;
  try {
    const usersData = await users.findOne({ where: { id: userMail } });
    result = usersData.map(user => userUtils.getPublicUser(user));
  } catch (err) {
    // TODO throw custom error
    error = err;
  }
  return [error, result];
}

async function getByUsername(userMail) {
  let error;
  let result;
  try {
    const usersData = await users.findOne({ where: { username: userMail } });
    result = usersData.map(user => userUtils.getPublicUser(user));
  } catch (err) {
    // TODO throw custom error
    error = err;
  }
  return [error, result];
}

async function createUser(userData) {
  // TODO validate userData properties
  let error;
  let result;
  try {
    const usersData = await users.insert(userData);
    result = usersData.map(user => userUtils.getPublicUser(user));
  } catch (err) {
    // TODO throw custom error
    error = err;
  }
  return [error, result];
}

async function validateUserPassword() {
  // TODO do actual validation
  return true;
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  createUser,
  validateUserPassword
};
