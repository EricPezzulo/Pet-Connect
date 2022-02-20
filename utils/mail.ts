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
    html: `<div style="background-color:#fceeff; height:100%; display: flex; flexDirection: column; align-items: center; justify-content: center; padding-block: 3rem; max-width: 1200px;">
              <h1 style="font-weight: 300;">Hi ${recipient}!</h1>
              <p>${emailContent}</p>
            </div>`
  });
  console.log("Message sent: %s", info.messageId);
};




export default SendMail;