const jwt = require('jsonwebtoken');

const SECRET_KEY = 'JWT_SECRET_KEY';

const generateToken = ({ id, username, email }) => {
	return jwt.sign({ id, username, email }, SECRET_KEY, { expiresIn: '5d' });
};

const getUserFromToken = (token) => {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (err) {
		return null;
	}
};

module.exports = { generateToken, getUserFromToken };
