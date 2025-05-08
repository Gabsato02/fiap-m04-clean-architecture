module.exports = (transactionRepository) => {
  return async function createTransaction(transactionData) {
    return await transactionRepository.create(transactionData);
  };
};
