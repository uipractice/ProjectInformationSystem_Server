const nodemailer = require('nodemailer');
const log = console.log;

const formSubmitted = (email, projectManager, projectNameByIT, mongoID) => {
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
    to: 'evkappspoc@evoketechnologies.com', //Evoke IT team email ID
    from: email,
    // cc: "cc email id goes here",
    // bcc: "cc email id goes here",
    subject: `"Form of ${projectNameByIT} project is submitted."`,
    html: ` <!DOCTYPE html>
    <html lang="en-IN">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Project Information System</title>
      </head>
    
      <body>
        <table
          cellpadding="0"
          cellspacing="0"
          width="600"
          border="0"
          style="
            font-family: calibri;
            font-size: 14px;
            color: #6d6d6d;
            padding-bottom: 15px;
            margin: auto;
            background: #f8f8f8;
            padding-bottom: 0;
          "
        >
          <tbody>
            <tr style="background: #023047">
              <td style="padding: 7px 0 7px 15px;" width="39%">
                <img
                  src="https://d331tpl5vusgqa.cloudfront.net/wp-content/uploads/2021/09/emails-logo.png"
                />
              </td>
              <td>
                <h2
                  style="
                    font-size: 16px;
                    font-weight: 900;
                    line-height: 22px;
                    font-family: calibri;
                    color: #f8a066;
                    border-left: 1px solid #7b7b7b;
                    padding-left: 10px;
                  "
                >
                  Project Information System
                </h2>
              </td>
              <td style="padding: 7px 15px 7px 0">
                <img
                  src="https://d331tpl5vusgqa.cloudfront.net/wp-content/uploads/2021/08/mail-icon.png"
                  style="float: right"
                />
              </td>
            </tr>
            <tr>
              <td
                align="left"
                style="padding: 30px; background-color: #219ebc"
                colspan="3"
              >
                <div>
                  <p
                    style="
                      font-weight: bold;
                      font-size: 20px;
                      line-height: 24px;
                      color: #ffffff;
                      font-family: calibri;
                      margin-top: 0;
                      margin-bottom: 0;
                      text-align: center;
                    "
                  >
                    Project details are successfully submitted.
                  </p>
                </div>
              </td>
            </tr>
    
            <tr>
              <td
                align="center"
                style="
                  padding: 30px;
                  background-color: #fff;
                  border: 1px solid #dfdddd;
                  border-top: 0;
                "
                colspan="3"
              >
                <img
                  src="https://d331tpl5vusgqa.cloudfront.net/wp-content/uploads/2021/09/submitted-1.png"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
    
          `,
  };

  // Step 3
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      // res.json({
      //   status: 'failed to send the mail',
      // });
      log('Filed to send, to see the detials uncomment below log');
      log('Error occured in sending the mail : ', err);
    } else {
      // res.json({
      //   status: 'success',
      // });
      log('Mail Sent Successfully, to see the detials uncomment below log');
      log('Mail sent successfully', info);
    }
  });
};

module.exports = { formSubmitted };
