import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(req: Request) {
  try {
    console.log('Login API: Connecting to DB...');
    await dbConnect();
    console.log('Login API: DB Connected');

    const { email, password } = await req.json();
    console.log('Login API: Attempting to login for email:', email);

    // Check if user exists and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Login API: User not found:', email);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    console.log('Login API: Comparing password for user:', email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login API: Password mismatch for user:', email);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

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
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    console.log('Login API: Login successful for user:', email);
    return response;
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
