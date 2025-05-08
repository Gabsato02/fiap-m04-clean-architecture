module.exports = (transactionRepository) => {
  return async function updateTransaction(id, updatedData) {
    return await transactionRepository.update(id, updatedData);
  };
};
