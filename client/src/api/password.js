export const getPassword = async (passwordName) => {
  const response = await fetch(`/api/password/${passwordName}`);
  const password = await response.text();
  return password;
};
