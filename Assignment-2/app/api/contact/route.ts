import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/db';
import { Contact } from '@/models/Contact';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Connect to DB and save a backup
    await connectDB();
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send it to yourself
      subject: `New Portfolio Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
  }
}
