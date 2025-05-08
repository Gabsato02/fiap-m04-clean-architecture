module.exports = (transactionRepository) => {
	return async function listTransactions(userId) {
		return await transactionRepository.listByUserId(userId);
	};
};
