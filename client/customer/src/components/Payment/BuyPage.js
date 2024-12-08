import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas component

const BuyPage = () => {
    const [showQR, setShowQR] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        cvv: "",
        expiryDate: "",
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method
    const [transactionMessage, setTransactionMessage] = useState(""); // Track success message
    const [isProcessing, setIsProcessing] = useState(false); // Track processing state
    const [isTransactionComplete, setIsTransactionComplete] = useState(false); // Track if the transaction is complete

    const handleGenerateQR = () => {
        setShowQR(true); // Show QR code when generate button is clicked
        setSelectedPaymentMethod(null); // Reset selected payment method when generating QR
        setIsTransactionComplete(false); // Reset transaction state when generating QR
        setTransactionMessage(""); // Reset transaction message
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method); // Set the selected payment method
        setShowQR(false); // Hide the QR code when payment method is selected
        setTransactionMessage(""); // Reset transaction message when selecting a new method
        setIsTransactionComplete(false); // Reset transaction completion state
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Simulate processing transaction (with delay for realism)
        setIsProcessing(true);
        setTimeout(() => {
            // After processing delay, show success message and hide card details
            setTransactionMessage("Your transaction has been successfully completed!");
            setIsProcessing(false);
            setIsTransactionComplete(true); // Mark transaction as complete
            setCardDetails({ cardNumber: "", cvv: "", expiryDate: "" }); // Clear card details
        }, 2000); // 2 seconds delay to simulate transaction processing
    };

    // Create a string or URL that you want to encode into the QR code
    const qrData = `Card Number: ${cardDetails.cardNumber}, CVV: ${cardDetails.cvv}, Expiry: ${cardDetails.expiryDate}`;

    return (
        <div style={styles.container}>
            <h2>Payment Options</h2>
            <div style={styles.buttonGroup}>
                <button style={styles.qrButton} onClick={handleGenerateQR}>
                    Generate QR
                </button>
                <button
                    style={styles.cardButton}
                    onClick={() => handlePaymentMethodSelect("credit")}
                    disabled={isTransactionComplete} // Disable button after transaction
                >
                    Credit Card
                </button>
                <button
                    style={styles.cardButton}
                    onClick={() => handlePaymentMethodSelect("debit")}
                    disabled={isTransactionComplete} // Disable button after transaction
                >
                    Debit Card
                </button>
            </div>
            {showQR && !selectedPaymentMethod && (
                <div style={styles.qrCode}>
                    <QRCodeCanvas value={qrData} size={256} /> {/* Display the generated QR code */}
                </div>
            )}
            {selectedPaymentMethod && !isTransactionComplete && (
                <form style={styles.cardForm} onSubmit={handleSubmit}>
                    <h3>Enter Card Details ({selectedPaymentMethod} Card)</h3>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (16 digits)"
                        value={cardDetails.cardNumber}
                        maxLength="16"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV (3 digits)"
                        value={cardDetails.cvv}
                        maxLength="3"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="expiryDate"
                        placeholder="Expiry Date (MM/YYYY)"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                    />
                    <button type="submit" style={styles.submitButton} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Submit"}
                    </button>
                </form>
            )}

            {transactionMessage && (
                <div style={styles.successMessage}>
                    <p>{transactionMessage}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        margin: "20px 0",
    },
    qrButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    cardButton: {
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    qrCode: {
        marginTop: "20px",
        border: "1px solid #ccc",
        padding: "50px",
        borderRadius: "5px",
        display: "inline-block",
    },
    cardForm: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    successMessage: {
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#28a745",
        color: "white",
        borderRadius: "5px",
        fontSize: "18px",
        animation: "fadeIn 2s", // Apply animation
    },
    "@keyframes fadeIn": {
        "0%": {
            opacity: 0,
        },
        "100%": {
            opacity: 1,
        },
    },
};

export default BuyPage;
