import nodemailer from "nodemailer";

const SendMail = async ({ recipient, subject, emailContent }: any) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.OUTLOOK_EMAIL,
    to: recipient,
    subject: `You have an Iquirey about ${subject}`,
    html: `<div>
              <h1>Hi ${recipient}!</h1>
              <h3>You have an iquirey about ${subject}</h3>
              <p>${emailContent}</p>
            </div>`
  });
  console.log("Message sent: %s", info.messageId);
};




export default SendMail;