import connectDb from './connectDb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

  try {
    await connectDb();
    
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ success: false, message: 'Mobile number is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    let user = await User.findOne({ mobile });
    if (!user) user = await User.create({ mobile, otp });
    else user.otp = otp;

    await user.save();
    
    console.log(`OTP sent to ${mobile}: ${otp}`); // Replace this with an SMS service

    return res.json({ success: true, message: 'OTP sent successfully' });

  } catch (error) {
    console.error('Error in sendOtp:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
