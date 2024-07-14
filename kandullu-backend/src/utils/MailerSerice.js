import nodemailer from 'nodemailer';

const MailerService = async (to, subject, text) => {
                  // Create transporter for nodemailer
                  const transporter = nodemailer.createTransport({
                    service: process.env.SERVICE,
                    auth: {
                        user: process.env.GMAIL_APP_MAIL, // Replace with your email
                        pass: process.env.GMAIL_APP_PASS, // Replace with your email password
                    },
                });
    
                // Email options
                const mailOptions = {
                    from:  process.env.GMAIL_APP_MAIL, // Replace with your email
                    to,
                    subject,
                    text,
                };
    
                // Send email
                await transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error('Error sending email:', err);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
              }

              export default MailerService;