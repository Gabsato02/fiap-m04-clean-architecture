const dbService = require('../services/dbService');
const jwtUtils = require('../utils/jwtUtils');

// Criar Usuário
const createUser = (req, res) => {
	const db = dbService.readDB();
	const newUser = { id: Date.now(), ...req.body, balance: 0, history: [0] };
	db.users.push(newUser);
	dbService.writeDB(db);
	res.status(201).json(newUser);
};

// Login
const login = (req, res) => {
	const { email, password } = req.body;
	const db = dbService.readDB();
	const user = db.users.find(
		(u) => u.email === email && u.password === password
	);

	if (!user) {
		return res.status(401).json({ error: 'Credenciais inválidas' });
	}

	const token = jwtUtils.generateToken(user);
	res.json({ token });
};

// Buscar Usuário
const getUser = (req, res) => {
	const db = dbService.readDB();
	const user = db.users.find((u) => u.id === req.user.id);

	if (!user) {
		return res.status(404).json({ error: 'Usuário não encontrado' });
	}

	const { password, ...userInfo } = user;
	res.json(userInfo);
};

module.exports = { createUser, login, getUser };
