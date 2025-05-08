const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./interface/middlewares/authMiddleware');
const authController = require('./interface/controllers/authController');
const transactionController = require('./interface/controllers/transactionController');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rotas públicas
app.post('/user', authController.register);
app.post('/login', authController.login);

// Rotas protegidas
app.get('/user', authMiddleware.authenticate, authController.getUser);

app.post(
	'/transactions',
	authMiddleware.authenticate,
	transactionController.create
);

app.get(
	'/transactions',
	authMiddleware.authenticate,
	transactionController.list
);

app.put(
	'/transactions/:id',
	authMiddleware.authenticate,
	transactionController.update
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
