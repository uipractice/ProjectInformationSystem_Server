const nodemailer = require("nodemailer");
const log = console.log;

const mailReshare = (email, projectManager, projectNameByIT, reshareReason, mongoID) => {
  //Step 1:
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: 'gmail',
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      // user: process.env.SMTP_USER,
      user: "deepakumar.dx@gmail.com",
      // pass: process.env.SMTP_PASS,
      pass: "GoogleBaba@8",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Step 2
  let mailOptions = {
    to: email,
    // from: '"Evoke Sales Team" <evokepoc@evoketechnologies.com>',
    from: 'deepakumar.dx@gmail.com',
    // cc: "thedipakkumaryadav@gmail.com",
    // bcc: "deepakumar.dx@gmail.com",
    subject: `"Request to re-share the details of ${projectNameByIT} project."`,
    html: "Email body "` <p> <b> Dear ${projectManager} </b> </p>
            
             You are request to fill the details of <b> ${projectNameByIT} </b> project AGAIN
             by clicking <a href = "http://localhost:3000/form/${mongoID}" target="_blank" title="Click to Open the Form"> <b> here. </b> </a>
             <p>The reason you need to resubmit the detials is because: <b> ${reshareReason} </b> </p>
            <p>Note: All fields are mendatory, if you are not sure about some detials then mention "NOT SURE" or "NOT APPLICABLE".</P>
             <br></br>
            <p> Warm Regards, <br>
                Evoke Sales Teams  </p>
            <br>
            <center><code> <I> <p> This is an autogenerated email, please do not reply :) <br>
            If you have any concerned or query, then please reach out to IT team directly. </p> </I> </code> </center>
          `,
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json({
          status: "failed to send the mail",
        });
      log("Filed to send, to see the detials uncomment below log");
      log("Error occured in sending the mail : ", err);
    } else {
      res.json({
        status: "success",
      });
      log("Mail Sent Successfully, to see the detials uncomment below log");
      log("Mail sent successfully", info);
    }
  });
};

module.exports = { mailReshare };
