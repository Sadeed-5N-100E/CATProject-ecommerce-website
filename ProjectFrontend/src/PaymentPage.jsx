import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const navigate = useNavigate();
  const totalPrice = 120.5; // Example price

  const validateForm = () => {
    const newErrors = {};
    const cardNumberRegex = /^\d{16}$/; // 16 digits
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    const cvvRegex = /^\d{3,4}$/; // 3 or 4 digits

    if (!selectedCard) {
      newErrors.selectedCard = "Please select a card type.";
    }
    if (!cardNumberRegex.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!expiryDateRegex.test(expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    }
    if (!cvvRegex.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handlePayment = () => {
    if (validateForm()) {
      setIsPopupVisible(true); // Show the success popup
      setTimeout(() => {
        setIsPopupVisible(false); // Hide the popup
        navigate("/"); // Redirect to homepage
      }, 2000); // 2-second delay before redirect
    }
  };

  const handleCancel = () => {
    navigate("/ViewCartPage"); // Redirect to ViewCartPage
  };

  return (
    <div className="PPheader">
      <article className="paymentbox">
        <h1>Payment Details</h1>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>

        <div className="card-selection">
          <label htmlFor="card-type">Choose Card Type:</label>
          <select
            id="card-type"
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
          >
            <option value="">Select Card Type</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="AmericanExpress">American Express</option>
            <option value="Discover">Discover</option>
            <option value="PayPalPrepaidMastercard">PayPal Prepaid Mastercard</option>
          </select>
          {errors.selectedCard && <p className="error">{errors.selectedCard}</p>}
        </div>

        <div className="card-details">
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

          <label htmlFor="expiry-date">Expiry Date (MM/YY):</label>
          <input
            type="text"
            id="expiry-date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </div>

        <div className="payment-buttons">
          <button className="pay-button" onClick={handlePayment}>
            Proceed to Pay
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel Payment
          </button>
        </div>
      </article>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Payment Successful!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
