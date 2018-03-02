import nodemailer from 'nodemailer';
import { error } from './dna.logger';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'order@menufield.com',
    pass: 'kork4891',
  },
});


module.exports.send = (to, subject, body, attachments) => {
  const mailOptions = {
    from: 'New Order! <order@menufield.com>',
    to,
    subject,
    html: body,
  };

  if (attachments) { mailOptions.attachments = attachments; }

  transporter.sendMail(mailOptions, (err) => {
    if (err) { error(err); }
  });
};
