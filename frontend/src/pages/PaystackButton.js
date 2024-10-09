import React, { useEffect } from 'react';

const PaystackButton = ({ amount, email, onSuccess }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.onload = () => {
            // Paystack script loaded
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (window.PaystackPop) {
            const handler = window.PaystackPop.setup({
                key: 'pk_test_ec3919844b3b5edabe24486256a02efa66fe2209', // Replace with your Paystack public key
                email: email,
                amount: amount * 10000, // Amount in kobo
                callback: (response) => {
                    onSuccess(response.reference);
                },
                onClose: () => {
                    alert('Payment was not completed.');
                }
            });
            handler.openIframe();
        } else {
            console.error('Paystack library is not loaded.');
        }
    };

    return (
        <button onClick={handlePayment} className="paystack-button bg-blue-600 p-2 text-white w-full mt-2">
            Pay Now
        </button>
    );
};

export default PaystackButton;
