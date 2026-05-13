const axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

axios.default = axios;
axios.__esModule = true;

module.exports = axios;
