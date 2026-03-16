import { NextResponse } from 'next/server';
import { validateForm } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    const errors = validateForm({ name: name ?? '', email: email ?? '', phone: phone ?? '', subject: subject ?? '', message: message ?? '' });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    // TODO: Integrate with email service (e.g., SendGrid, Resend, Nodemailer)
    console.log('Contact form submission:', { name, email, phone, subject, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
