const sanitizationUtils = require('../../../infrastructure/utils/sanitizationUtils');

module.exports = (transactionRepository) => {
	return async function listTransactions(userId) {
		const { userId: $userId } = sanitizationUtils.sanitizeInput({ userId });
		return await transactionRepository.listByUserId($userId);
	};
};
