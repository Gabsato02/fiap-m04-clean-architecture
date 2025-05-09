class TransactionRepository {
	async create(transaction) {
		throw new Error('Método não implementado');
	}

	async update(id, updatedData) {
		throw new Error('Método não implementado');
	}

	async listByUserId(userId) {
		throw new Error('Método não implementado');
	}
}

module.exports = TransactionRepository;
