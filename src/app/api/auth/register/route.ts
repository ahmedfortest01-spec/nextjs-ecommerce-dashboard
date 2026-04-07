import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(req: Request) {
  try {
    console.log('Register API: Connecting to DB...');
    await dbConnect();
    console.log('Register API: DB Connected');

    const { name, email, password } = await req.json();
    console.log('Register API: Attempting to register email:', email);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Register API: User already exists:', email);
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user - Force 'user' role for self-registration
    const user = await User.create({
      name,
      email,
      password,
      role: 'user',
    });
    console.log('Register API: User created with ID:', user._id);

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '30d',
    });

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Register API Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
