const sanitizationUtils = require('../../../infrastructure/utils/sanitizationUtils');

module.exports = (transactionRepository) => {
	return async function updateTransaction(id, updatedData) {
		const { id: $id } = sanitizationUtils.sanitizeInput({ id });
		return await transactionRepository.update(
			$id,
			sanitizationUtils.sanitizeInput(updatedData)
		);
	};
};
