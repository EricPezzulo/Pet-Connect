import nodemailer from "nodemailer";

const SendMail = async ({ recipient, subject, emailContent }: any) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "ericpezzdev@outlook.com",
      pass: "RedEleven67!",
    },
  });
  let info = await transporter.sendMail({
    from: "ericpezzdev@outlook.com",
    to: recipient,
    subject,
    html: emailContent,
  });
  console.log("Message sent: %s", info.messageId);
};

export default SendMail;
