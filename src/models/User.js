import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  mobile: { type: String, unique: true, required: true },
  otp: { type: String },
  name: { type: String },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
