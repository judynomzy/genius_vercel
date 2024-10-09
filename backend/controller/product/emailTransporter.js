const nodemailer = require('nodemailer');

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'geniusjournali8@gmail.com', // Your email
        pass: 'your-email-password' // Your email password or app-specific password
    }
});

async function sendEmailWithAttachment(to, subject, text, attachments) {
    const mailOptions = {
        from: 'geniusjournali8@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: attachments.map((attachment, index) => ({
            filename: attachment.filename || `file-${index + 1}.docx`, // Adjust filenames if necessary
            content: attachment.content
        }))
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendEmailWithAttachment };
