import nodemailer from 'nodemailer'

export async function sendMailTest(){
  // Generate SMTP service account from ethereal.email
  nodemailer.createTestAccount((err, account) => {
      if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
      }

      console.log('Credentials obtained, sending message...');

      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'hunter43@ethereal.email',
            pass: 'RPSsyzmmg4uSQNAnFM'
        }
    });

      // Message object
      let message = {
          from: `${account.user}`,
          to: 'hunter43@ethereal.email',
          subject: 'Your sign up',
          text: 'You signed up to something',
          html: '<p><b>Hello</b> to myself!</p>'
      };

      transporter.sendMail(message, (err, info) => {
          if (err) {
              console.log('Error occurred. ' + err.message);
              return process.exit(1);
          }

          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
  });
}