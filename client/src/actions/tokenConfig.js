export default (getState) => {
  // Get tokena from locaStorage
  const { token } = getState().auth;

  const config = {
    headers: {
      'Context-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
