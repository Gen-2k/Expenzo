import { createUser } from '../services/user.service.js';
import { findUserByEmail } from '../services/user.service.js';
import { generateToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';

export const registerContoller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long',
      });
    }
    const user = await createUser(name, email, password);
    return res.status(201).json({
      message: 'User created successfully',
      user: user,
    });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({
      message: err.message || 'Internal server error',
    });
  }
};

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'email and password required',
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    const token = generateToken({
      userId: user.id,
    });
    return res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
}
