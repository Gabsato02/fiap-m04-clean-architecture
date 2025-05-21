const transactionRepository = require('../../infrastructure/db/transactionDbRepository');

const createTransaction =
	require('../../application/use_cases/transaction/createTransaction')(
		transactionRepository
	);
const updateTransaction =
	require('../../application/use_cases/transaction/updateTransaction')(
		transactionRepository
	);
const listTransactions =
	require('../../application/use_cases/transaction/listTransactions')(
		transactionRepository
	);

const create = async (req, res) => {
	try {
		const transactionData = { ...req.body, userId: req.user.id };
		const transaction = await createTransaction(transactionData);
		res.status(201).json(transaction);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const update = async (req, res) => {
	try {
		const updated = await updateTransaction(req.params.id, {
			...req.body,
			userId: req.user.id,
		});
		if (!updated) {
			return res.status(404).json({ error: 'Transaction not found' });
		}
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const list = async (req, res) => {
	try {
		const resp = await listTransactions(req.user.id, req.query.page, req.query.size);
		res.json(resp);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { list, create, update };
