import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: options.email, // List of recipients
    subject: options.subject, // Subject line
    text: options.message, // Plain text body
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
