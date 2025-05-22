const sanitizationUtils = require('../../../infrastructure/utils/sanitizationUtils');

module.exports = (transactionRepository) => {
	return async function listTransactions(userId, page, size) {
		const { userId: $userId } = sanitizationUtils.sanitizeInput({ userId });
		return await transactionRepository.listByUserId($userId, page, size);
	};
};
