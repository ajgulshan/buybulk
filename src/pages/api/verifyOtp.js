import connectDb from './connectDb';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectDb();

  const { mobile, otp } = req.body;
  const user = await User.findOne({ mobile, otp });
  if (!user) return res.status(400).json({ success: false, message: 'Invalid OTP' });

  const token = jwt.sign({ mobile }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.json({ success: true, token, user });
}
