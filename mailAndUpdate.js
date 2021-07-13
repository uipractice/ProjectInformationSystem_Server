const nodemailer = require("nodemailer");
const log = console.log;

const mailAndUpdate = (email, projectManager, projectNameByIT, mongoID) => {
  //Step 1:
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: "gmail",
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
    to: "deepakumar.dx@gmail.com",
    // from: '"Evoke Sales Team" <evokepoc@evoketechnologies.com>',
    from: email,
    // cc: "thedipakkumaryadav@gmail.com",
    // bcc: "deepakumar.dx@gmail.com",
    subject: `"Form of ${projectNameByIT} project is submitted."`,
    html: ` <p> <b> Dear ${projectManager} </b> </p>
            
            <p> Please Approve it !. </p>
             You are request to fill the details of <b> ${projectNameByIT} </b> project AGAIN
             by clicking <a href = "http://localhost:3000/form/${mongoID}" target="_blank" title="Click to Open the Form"> <b> here. </b> </a>
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

module.exports = { mailAndUpdate };