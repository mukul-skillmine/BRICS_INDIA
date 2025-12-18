import nodemailer from "nodemailer";

console.log(
  `${process.env.SMTP_PORT} ${process.env.SMTP_HOST} ${process.env.SMTP_PASS} ${process.env.SMTP_USER} `
);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: `OTP System <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
};
