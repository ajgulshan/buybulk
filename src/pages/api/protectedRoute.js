import { verifyToken } from "@/lib/auth";

export default function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);

  if (!user) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  res.status(200).json({ message: "Protected data", user });
}
