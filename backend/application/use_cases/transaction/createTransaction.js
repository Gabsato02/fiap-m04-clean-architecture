const sanitizationUtils = require('../../../infrastructure/utils/sanitizationUtils');

module.exports = (transactionRepository) => {
	return async function createTransaction(transactionData) {
		return await transactionRepository.create(sanitizationUtils.sanitizeInput(transactionData));
	};
};
