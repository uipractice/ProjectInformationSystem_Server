const nodemailer = require('nodemailer');
const log = console.log;

const feedbackMail = (feedbackBody) => {
  //Step 1:
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Step 2
  let mailOptions = {
    to: 'evoke_ui@evoketechnologies.com',
    from: '"Evoke IT Team" <evkappspoc@evoketechnologies.com>', //Evoke IT team email ID
    // cc: "cc email id goes here",
    // bcc: "cc email id goes here",
    subject: `"Feeback of PIS Applicaion."`,
    html: ` <p> <b> Dear Basha </b> </p>
            
            ${feedbackBody} 
          
            <p> Warm Regards, <br>
                Evoke IT Teams  </p>
            <br>
          `,
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      log('Filed to send, to see the detials uncomment below log');
      log('Error occured in sending the mail : ', err);
    } else {
      log('Mail Sent Successfully, to see the detials uncomment below log');
      log('Mail sent successfully', info);
    }
  });
};

module.exports = { feedbackMail };
