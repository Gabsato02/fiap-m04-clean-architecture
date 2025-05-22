const db = require('./dbService');
const TransactionRepository = require('../../domain/repositories/transactionRepository');

class TransactionDbRepository extends TransactionRepository {
	async create(transaction) {
		const _db = db.readDB();

		if (!transaction.description || !transaction.amount || !transaction.type) {
			throw new Error(
				'Dados inválidos. A transação deve ter descrição, valor e tipo.'
			);
		}

		const newTransaction = {
			id: Date.now(),
			...transaction,
			date: new Date().toISOString(),
		};

		_db.transactions.push(newTransaction);

		const userIndex = _db.users.findIndex(
			({ id }) => id === transaction.userId
		);

		const newBalance =
			_db.users[userIndex].balance +
			(isNaN(transaction.amount) ? 0 : transaction.amount);

		_db.users[userIndex].balance = newBalance;

		_db.users[userIndex].history.push(newBalance);

		db.writeDB(_db);

		return newTransaction;
	}

	async update(id, updatedData) {
		const _db = db.readDB();

		const transactionIndex = _db.transactions.findIndex(
			(t) => t.id === parseInt(id) && t.userId === updatedData.userId
		);

		if (transactionIndex === -1) throw new Error('Transação não encontrada');

		const updatedTransaction = {
			..._db.transactions[transactionIndex],
			...updatedData,
		};

		_db.transactions[transactionIndex] = updatedTransaction;

		db.writeDB(_db);

		return updatedTransaction;
	}

	async listByUserId(userId, page, size) {
		const _db = db.readDB();

		const userTransactions = _db.transactions.filter(
			(t) => t.userId === userId
		);

		userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

		if (page && size) {
			const pageNumber = parseInt(page, 10);
			const pageSize = parseInt(size, 10);

			const startIndex = (pageNumber - 1) * pageSize;
			const endIndex = startIndex + pageSize;

			const paginatedTransactions = userTransactions.slice(
				startIndex,
				endIndex
			);

			return {
				transactions: paginatedTransactions,
				total: userTransactions.length,
				page: pageNumber,
				size: pageSize,
			};
		}

		return {
			transactions: userTransactions,
			total: userTransactions.length,
		};
	}
}

module.exports = new TransactionDbRepository();
