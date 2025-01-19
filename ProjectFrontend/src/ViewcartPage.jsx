import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Modal from 'react-modal'; // Import Modal
import Asp from "./assets/Asp.jpg";
import {Link} from "react-router-dom";
import "./ViewcartPage.css"
import PharmacyLogo from "./assets/LoginPageAssets/RoyalHarapanPharmacy.png";
import PharmacyLogoNoWords from "./assets/LoginPageAssets/PharmacyLogo.png";

Modal.setAppElement('#root'); // Set the app element for accessibility

const ViewcartPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); // Initialize cartItems
    const [showError, setShowError] = useState(false); // State for error message

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        };

          const updateQuantity = (id, increment) => {
            setCartItems((prevItems) =>
              prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + (increment ? 1 : -1)) }
                    : item
            )
        );
    };

    const navigate = useNavigate();

    const handleCheckoutClick = () => {
        if (cartItems.length === 0) {
            setShowError(true); // Show error if cart is empty
        } else {
            const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            navigate('/PaymentPage', { state: { totalPrice } }); // Pass totalPrice to PaymentPage
        }
    };

    const closeErrorPopup = () => {
        setShowError(false);
    };

    useEffect(() => {
        fetch('http://localhost:8080/cat201project/CartServlet')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the response to see its structure
                if (data && data.cart) {
                    setCartItems(data.cart); // Assuming you have a state variable for cart items
                } else {
                    console.error('Invalid data structure:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calculate totalPrice here

    return (
        <>
            <header className="VCheader">
                <div className="VCoverlay-box">
                    <img src={PharmacyLogo} alt="Pharmacy Logo" className="VCLogo" />
                    <img src={PharmacyLogoNoWords} alt="Pharmacy Logo No Words" className="VCLogoNoWords" />
                    <nav className={`VCmain-nav ${isMenuOpen ? 'open' : ''}`}>
                        <ul>
                            <li><Link to="/LandingPage">Back to main</Link></li>
                        </ul>
                    </nav>
                    <button className="VChamburger" onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </header>

            <section className="Vcart-container">
                <table className="Vcart-table">
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Information</th>
                            <th>Quantity</th>
                            <th>Accumulated Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.image} alt={item.name} className="Vproduct-image" />
                                </td>
                                <td>
                                    <p><strong>Name:</strong> {item.name}</p>
                                    <p><strong>Category:</strong> {item.category}</p>
                                    <p><strong>Brand:</strong> {item.brand}</p>
                                </td>
                                <td>
                                    <div className="Vquantity-control">
                                        <button onClick={() => updateQuantity(item.id, false)}>-</button>
                                        <span className="Vquantity-box">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, true)}>+</button>
                                    </div>
                                </td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="total-label">Total Price:</td>
                            <td>${totalPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <button className="Vcheckout-btn" onClick={handleCheckoutClick}>Checkout</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </section>

            {showError && (
                <div className="small-popup">
                    <p>Your cart is empty. Please add items to your cart before checking out.</p>
                    <button onClick={closeErrorPopup}>Close</button>
                </div>
            )}
        </>
    );
};

export default ViewcartPage;