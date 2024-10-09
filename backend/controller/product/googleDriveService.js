const { google } = require('googleapis');
const drive = google.drive('v3');

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH, // Path to your service account key file
    scopes: ['https://www.googleapis.com/auth/drive'],
});

async function getDriveFile(fileId) {
    const authClient = await auth.getClient();
    const res = await drive.files.get({
        fileId: fileId,
        alt: 'media', // Retrieve file content
        auth: authClient
    });

    return res.data; // Return file content
}

module.exports = { getDriveFile };
