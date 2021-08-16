const nodemailer = require('nodemailer');
const log = console.log;

const feedbackMail = (feedbackBody) => {
  //Step 1:
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: 'gmail',
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      // user: process.env.SMTP_USER,
      user: 'deepakumar.dx@gmail.com',
      // pass: process.env.SMTP_PASS,
      pass: 'GoogleBaba@2',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Step 2
  let mailOptions = {
    to: 'thedipakkumaryadav@gmail.com',
    // from: '"Evoke Sales Team" <evokepoc@evoketechnologies.com>',
    from: 'deepakumar.dx@gmail.com',
    // cc: "thedipakkumaryadav@gmail.com",
    // bcc: "deepakumar.dx@gmail.com",
    subject: `"Feeback of PIS Applicaion."`,
    html: ` <p> <b> Dear Basha/Team </b> </p>
            
           
            ${feedbackBody} 

            <p>Note: All fields are mendatory, if you are not sure about some detials then mention "NOT SURE" or "NOT APPLICABLE".</P>
          
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
