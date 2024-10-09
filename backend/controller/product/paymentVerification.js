const paymentModel = require('../../models/paymentModel');
const { sendEmailWithAttachment } = require('./emailTransporter');
const { getDriveFile } = require('./googleDriveService');


async function PaymentVerificationController(req, res) {
    try {
      // Log the entire request body to check incoming data
      console.log('Request Body:', req.body);
  
      const { reference, products, email } = req.body;
      
      if (!reference || !products || !email) {
        return res.status(400).json({
          message: "Missing required fields",
          error: true,
          success: false
        });
      }

        const paystackSecretKey = "sk_live_742742b1c80167acf47b328ae0421bdb3cbab78f"; // Paystack secret key
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`,
                "Content-Type": "application/json"
            }
        });

        const responseData = await response.json();

        if (responseData.status && responseData.data.status === 'success') {
            // Save payment data
            const newPayment = new paymentModel({
                reference,
                products,
                email,
                amount: responseData.data.amount / 100, // Convert Kobo to Naira
                status: responseData.data.status
            });

            await newPayment.save();

            // Fetch files from Google Drive and prepare attachments
            const fileIds = products.map(product => product.fileId); // Assuming products contain fileId
            const attachments = await Promise.all(fileIds.map(fileId => getDriveFile(fileId)));

            const emailAttachments = attachments.map((content, index) => ({
                filename: `file-${index + 1}.docx`, // Adjust filenames if needed
                content
            }));

            // Send email with the retrieved attachments
            await sendEmailWithAttachment(email, 'Your Files', 'Please find your files attached.', emailAttachments);

            return res.status(200).json({
                message: "Payment verified and email sent successfully",
                error: false,
                success: true
            });
        } else {
            return res.status(400).json({
                message: "Payment verification failed",
                error: true,
                success: false
            });
        }
    } catch (err) {
        console.error("Error verifying payment:", err);
        res.status(500).json({
          message: err.message || err,
          error: true,
          success: false
        });
    }
}

module.exports = PaymentVerificationController;
