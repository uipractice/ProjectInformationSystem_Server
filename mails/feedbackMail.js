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
        >
          <tbody>
            <tr style="background: #023047">
              <td style="padding: 7px 0 7px 15px; width: 39%">
                <img
                  src="https://d331tpl5vusgqa.cloudfront.net/wp-content/uploads/2021/08/logo-pis.svg"
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
                      font-size: 16px;
                      line-height: 24px;
                      color: #ffffff;
                      font-family: calibri;
                      margin-top: 0;
                    "
                  >
                    Hello Evoke UI Team
                  </p>
                  <p
                    style="
                      font-weight: bold;
                      font-size: 16px;
                      line-height: 24px;
                      color: #ffffff;
                      font-family: calibri;
                      margin-bottom: 0;
                    "
                  >
                   ${feedbackBody}
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
                  src="https://d331tpl5vusgqa.cloudfront.net/wp-content/uploads/2021/08/feedback.png"
                  style="width: 260px"
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
      log('Filed to send, to see the detials uncomment below log');
      log('Error occured in sending the mail : ', err);
    } else {
      log('Mail Sent Successfully, to see the detials uncomment below log');
      log('Mail sent successfully', info);
    }
  });
};

module.exports = { feedbackMail };
