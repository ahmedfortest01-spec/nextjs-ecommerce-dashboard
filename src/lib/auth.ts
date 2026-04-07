import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from './mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (!decoded) return null;

    await dbConnect();
    const user = await User.findById(decoded.id);
    return user;
  } catch (error) {
    return null;
  }
}

export async function isAdmin() {
  const user = await getUserFromToken();
  return user && user.role === 'admin';
}
