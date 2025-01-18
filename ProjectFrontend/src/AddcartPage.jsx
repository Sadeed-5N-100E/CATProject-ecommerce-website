import React, { useState ,useEffect} from 'react';
import "./AddcartPage.css"
import promo2 from "./assets/Promo2.jpg";
import Asp from "./assets/Asp.jpg";
import { Link } from 'react-router-dom';

const MedicineCard = ({ medicine }) => {
    const [quantity, setQuantity] = useState(0);
  
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 0 && setQuantity(quantity - 1);
    const addToCart = () => alert(`Added ${quantity} of ${medicine.name} to the cart.`);
  
    return (
      <div className="medicine-card">
        <div className="medicine-image">
          <img src={medicine.image} alt={medicine.name} />
        </div>
        <div className="medicine-details">
          <h3>{medicine.name}</h3>
          <p>Category: {medicine.category}</p>
          <p>Dosage: {medicine.dosage}</p>
          <p>Brand: {medicine.brand}</p>
          <p>Quantity: {medicine.number}</p>
          <p>Price: ${medicine.price}</p>
          <div className="quantity-control">
            <button onClick={decreaseQuantity}>-</button>
            <div className="quantity-box">{quantity}</div>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <button className="add-cart-btn" onClick={addToCart}>Add Cart</button>
        </div>
      </div>
    );
  };

const AddcartPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      };
      const medicines = [
        {
          name: 'Paracetamol',
          category: 'Pain Relief',
          dosage: '500mg',
          brand: 'HealthCare',
          price: 10,
          image: Asp,
          quantity: "30 / pax",
        },
        {
          name: 'Ibuprofen',
          category: 'Anti-inflammatory',
          dosage: '200mg',
          brand: 'MediSafe',
          price: 12,
          image: Asp,
          number: "30 / pax",
        },
        {
          name: 'Amoxicillin',
          category: 'Antibiotic',
          dosage: '250mg',
          brand: 'PharmaPlus',
          price: 15,
          image: Asp,
          number: "30 / pax",
        },
        {
          name: 'Cetirizine',
          category: 'Allergy Relief',
          dosage: '10mg',
          brand: 'AllerCare',
          price: 8,
          image: Asp,
          number: "30 / pax",
        },
        {
            name: 'Cetirizine',
            category: 'Allergy Relief',
            dosage: '10mg',
            brand: 'AllerCare',
            price: 8,
            image: Asp,
            number: "30 / pax",
          },
          {
            name: 'Cetirizine',
            category: 'Allergy Relief',
            dosage: '10mg',
            brand: 'AllerCare',
            price: 8,
            image: Asp,
            number: "30 / pax",
          },
      ];
  return (
<>
    <header className="Aheader">
    <div className="Aoverlay-box">

    <div className="Alogo">
        CAT Pharmacy
    </div>
    <nav className={`Amain-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
            {/* <li><a href="/SignupPage">Sign Up</a></li> */}
            <li><Link to ="/LandingPage">Back to Main</Link></li>
            <li><Link to="/ViewCartPage">View Cart</Link></li>
        </ul>
    </nav>
    <button className="Ahamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </button>
    </div>
    <section className="medicine-section">
        {medicines.map((medicine, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </section>
</header>
    </>
  )

}
export default AddcartPage;