import jwt from 'jsonwebtoken';

// Generates a JWT token.
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Verifies a JWT token.
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
