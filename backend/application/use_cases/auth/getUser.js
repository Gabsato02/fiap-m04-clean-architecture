module.exports = (userRepository) => {
  return async function getUserByEmail(email) {
    return await userRepository.findByEmail(email);
  };
};
