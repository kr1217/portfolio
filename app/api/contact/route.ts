import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const sanitize = require('mongo-sanitize');
    const { name, email, message } = sanitize(body);

    // Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success } = await rateLimit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Run DB Save and Email Send in parallel to improve speed
    const emailPromise = process.env.RESEND_API_KEY
      ? resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [process.env.CONTACT_EMAIL || 'delivered@resend.dev'],
          replyTo: email,
          subject: `New Portfolio Message from ${name}`,
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
          `,
        })
      : Promise.resolve(null);

    const dbPromise = Contact.create({
      name,
      email,
      message,
    });

    const [emailResult, newContact] = await Promise.all([emailPromise, dbPromise]);

    if (emailResult && emailResult.error) {
        console.error('Resend API Error:', emailResult.error);
    } else if (emailResult) {
        console.log('Resend Email Response:', emailResult);
    } else {
        console.warn("RESEND_API_KEY not configured. Email not sent.");
    }

    return NextResponse.json(
      { message: 'Message sent successfully', contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
