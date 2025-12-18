import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, otp }) => {
  await transporter.sendMail({
    from: `BRICS Summit <${process.env.SMTP_USER}>`,
    to,
    subject: "Email Verification - BRICS Summit 2026",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear User,</p>

        <p>
          Thank you for registering your interest in attending the
          <strong>BRICS Summit 2026</strong>.
        </p>

        <p>To verify your email address, please use the One-Time Password (OTP) below:</p>

        <p style="font-size: 28px; font-weight: bold; margin: 20px 0;  text-align: center;">
          ${otp}
        </p>

        <p>This OTP is valid for <strong>15 minutes</strong>.</p>

        <p>
          Enter it in the verification field to continue your application.
        </p>

        <p>If you did not request this, please ignore this email.</p>

        <p>Email entered: <strong>${to}</strong></p>

        <br />

        <p>Best Regards,<br/>BRICS Summit Team</p>
      </div>
    `,
  });
};
