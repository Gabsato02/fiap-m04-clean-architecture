const jwtUtils = require('../../infrastructure/utils/jwtUtils');
const userRepository = require('../../infrastructure/db/userDbRepository');

const createUser = require('../../application/use_cases/auth/createUser')(userRepository, jwtUtils);
const loginUser = require('../../application/use_cases/auth/login')(userRepository, jwtUtils);
const getUserByEmail = require('../../application/use_cases/auth/getUser')(userRepository);

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await createUser({ email, password });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserByEmail(req.user.email);
    res.json({ user });
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

module.exports = { register, login, getUser };
