const jwtUtils = require('../utils/jwtUtils');

// Middleware de autenticação
const authenticate = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Token não fornecido' });
	}

	const decodedUser = jwtUtils.getUserFromToken(token);

	if (!decodedUser) {
		return res.status(401).json({ error: 'Token inválido ou expirado' });
	}

	req.user = decodedUser;
	next();
};

module.exports = { authenticate };
