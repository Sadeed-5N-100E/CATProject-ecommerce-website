import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Asp from "./assets/Asp.jpg";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./ViewcartPage.css"
import PharmacyLogo from "./assets/LoginPageAssets/RoyalHarapanPharmacy.png";
import PharmacyLogoNoWords from "./assets/LoginPageAssets/PharmacyLogo.png";

const ViewcartPage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        };

        const [cartItems, setCartItems] = useState([
            {
              id: 1,
              name: 'Paracetamol',
              brand: 'HealthCare',
              category: 'Pain Relief',
              price: 10,
              image: Asp,
              quantity: 1,
            },
            {
              id: 2,
              name: 'Ibuprofen',
              brand: 'MediSafe',
              category: 'Anti-inflammatory',
              price: 12,
              image: Asp,
              quantity: 2,
            },
            {
              id: 3,
              name: 'Amoxicillin',
              brand: 'PharmaPlus',
              category: 'Antibiotic',
              price: 15,
              image: Asp,
              quantity: 1,
            },
            {
                id: 4,
                name: 'Amoxicillin',
                brand: 'PharmaPlus',
                category: 'Antibiotic',
                price: 15,
                image: Asp,
                quantity: 1,
              },
          ]);

          const updateQuantity = (id, increment) => {
            setCartItems((prevItems) =>
              prevItems.map((item) =>
                item.id === id
                  ? { ...item, quantity: Math.max(0, item.quantity + (increment ? 1 : -1)) }
                  : item
              )
            );
          };
        
          const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        

          const navigate = useNavigate();

          const handleCheckoutClick = (link) => {
            navigate(link); // Navigate to the new page
            setTimeout(() => {
              window.scrollTo(0, 0); // Scroll to the top after navigation
            }, 100); // Ensure this happens after navigation
          };


  return (
    <>
    <header className="VCheader">
    <div className="VCoverlay-box">
      <img src={PharmacyLogo} alt="Pharmacy Logo" className="VCLogo"/>
      <img src={PharmacyLogoNoWords} alt="Pharmacy Logo No Words" className="VCLogoNoWords"/>
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

    <sector className="Vcart-container">
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
                <button className="Vcheckout-btn" onClick={() => handleCheckoutClick(category.link)}>Checkout</button> // Pass the category link to navigate
              </td>
            </tr>
          </tfoot>
        </table>
      </sector>

</header>
    </>
  )
}

export default ViewcartPage;