import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY, // No need for .replace()
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

export default function handler(req, res) {
  return res.json({ success: true, message: "Firebase Admin SDK is working!" });
}
