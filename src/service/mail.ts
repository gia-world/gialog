import { Mail } from "@/types/mail";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // secure 옵션을 사용하려면 465 포트를 사용해야함
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail({ sender, title, content }: Mail) {
  const mailData = {
    to: process.env.AUTH_USER,
    from: sender,
    subject: `Gialog - ${title}`,
    html: `
    <h1>${title}</h1>
    <div>${content}</div>
    </br>
    <p>보낸사람 : ${sender}</p>
    `,
  };

  return transporter.sendMail(mailData);
}
