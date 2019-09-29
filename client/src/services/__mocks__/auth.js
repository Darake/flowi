let users = [
  {
    email: 'admin@example.com',
    password: 'admin1'
  }
];

const login = credentials => {
  const user = users.find(u => u.email === credentials.email);
  if (user && user.password === credentials.password) {
    return { token: 'token', email: credentials.email };
  }
  throw new Error('Request failed with status code 401');
};

const register = credentials => {
  const newUser = {
    email: credentials.email,
    password: credentials.password,
    currency: credentials.currency
  };
  users = users.concat(newUser);
  return Promise.resolve(null);
};

export default { login, register };
