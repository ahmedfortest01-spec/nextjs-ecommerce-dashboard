import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import { products as initialProducts } from '@/data/products';

export async function POST() {
  try {
    await dbConnect();

    // Create Demo Admin
    const adminExists = await User.findOne({ email: 'admin@test.com' });
    if (!adminExists) {
      await User.create({
        name: 'Demo Admin',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin',
      });
    }

    // Create Demo User
    const userExists = await User.findOne({ email: 'user@test.com' });
    if (!userExists) {
      await User.create({
        name: 'Demo User',
        email: 'user@test.com',
        password: 'password123',
        role: 'user',
      });
    }

    // Seed Initial Products if none exist
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      await Product.insertMany(initialProducts);
    }

    return NextResponse.json({
      success: true,
      message: 'Demo accounts and initial products seeded successfully'
    });
  } catch (error: any) {
    console.error('Seed API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
