import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "8b4bd1001@smtp-brevo.com"
      ,pass: "p8OAYQV5ZbWgXjkz"
    }
  });

  try {
    await transporter.sendMail({
      from: '"nios-ignou-sol" <krishnarajput9212@gmail.com>',
      to: email,
      subject,
      text: message,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}
