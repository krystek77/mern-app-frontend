const dev = process.env.NODE_ENV === 'development' ? true : false;

export const server = dev
  ? 'http://localhost:4000'
  : 'https://pralma-api.onrender.com';

