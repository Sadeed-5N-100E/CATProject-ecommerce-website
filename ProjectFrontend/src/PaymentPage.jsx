import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import axios from 'axios';

const PaymentPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(120.5); // Example price

  const navigate = useNavigate();

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

  const handlePayment = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const paymentData = {
        firstName,
        lastName,
        selectedCard,
        cardNumber,
        expiryDate,
        cvv,
        totalPrice,
      };

      console.log("Payment Data:", paymentData); // Log payment data

      try {
        const response = await axios.post('http://localhost:8080/cat201project/PaymentServlet', paymentData);
        console.log("Response:", response); // Log the response

        if (response.data.status === 'success') {
          setIsPopupVisible(true);
          setTimeout(() => {
            setIsPopupVisible(false);
            navigate("/LandingPage");
          }, 2000);
        } else {
          alert('Payment failed: ' + response.data.message);
        }
      } catch (error) {
        console.error("Payment error:", error.response ? error.response.data : error.message);
        alert('An error occurred while processing the payment.');
      }
    }
  };

  const handleCancel = () => {
    navigate("/ViewCartPage");
  };

  return (
    <div className="PPheader">
      <article className="paymentbox">
        <h1>Payment Details</h1>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>

        <form onSubmit={handlePayment}>
          <div className="card-selection">
            <label htmlFor="card-type">Choose Card Type:</label>
            <select
              id="card-type"
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              required
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
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="text"
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number"
              required
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

            <label htmlFor="expiry-date">Expiry Date (MM/YY):</label>
            <input
              type="text"
              id="expiry-date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
            {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              required
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </div>

          <div className="payment-buttons">
            <button className="pay-button" type="submit">
              Proceed to Pay
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel Payment
            </button>
          </div>
        </form>
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
