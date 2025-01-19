import React, { useState ,useEffect} from 'react';
import "./AddcartPage.css"
import promo2 from "./assets/Promo2.jpg";
import Asp from "./assets/Asp.jpg";
import { Link, useLocation } from 'react-router-dom';
import PharmacyLogo from "./assets/LoginPageAssets/RoyalHarapanPharmacy.png";
import PharmacyLogoNoWords from "./assets/LoginPageAssets/PharmacyLogo.png";
import medicinesData from '../../ProjectBackend/src/main/webapp/data/Medicines.json'; // Relative path

const AddcartPage = () => {
    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory; // Get the selected category
    console.log("Selected Category:", selectedCategory); // Debugging line
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [quantity, setQuantity] = useState(1); // Initialize quantity state

    useEffect(() => {
        // Filter medicines based on the selected category
        if (selectedCategory) {
            const filtered = medicinesData.products.filter(medicinesData => 
                medicinesData.category.toLowerCase() === selectedCategory.toLowerCase()
            );
            console.log("medicinesData Category:", medicinesData.category); // Debugging line
            setFilteredMedicines(filtered);
        }
    }, [selectedCategory]);

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Decrease quantity but not below 1
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1); // Increase quantity
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Define isMenuOpen state

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu state
    };

    const addToCart = (productId, quantity) => {
        fetch('http://localhost:8080/cat201project/AddcartServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                productId: productId,
                quantity: quantity,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Handle success or error message
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (!selectedCategory) {
        console.error("No category was passed from the Landing Page.");
        return <p>No category selected.</p>; // Or redirect to another page
    }

    return (
      <>
      <header className="Aheader">
      <div className="Aoverlay-box">
      <img src={PharmacyLogo} alt="Pharmacy Logo" className="ALogo"/>
      <img src={PharmacyLogoNoWords} alt="Pharmacy Logo No Words" className="ALogoNoWords"/>
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
            {filteredMedicines.length > 0 ? (
                filteredMedicines.map(medicine => (
                    <div className="medicine-card" key={medicine.id}>
                        <div className="medicine-image">
                          <img src={medicine.image} alt={medicine.name} />
                        </div>
                        <div className="medicine-details">
                          <h3>{medicine.name}</h3>
                          <p>Brand: {medicine.brand}</p>
                          <p>Price: ${medicine.price}</p>
                          <p>Dosage Form: {medicine.dosageForm}</p>
                          <p>Quantity: {medicine.quantity}</p>
                          <div className="quantity-control">
                              <button onClick={decreaseQuantity}>-</button>
                              <div className="quantity-box">{quantity}</div>
                              <button onClick={increaseQuantity}>+</button>
                          </div>
                        </div>
                        <button className="add-cart-btn" onClick={() => addToCart(medicine.id, quantity)}>ADD CART</button>
                    </div>
                ))
            ) : (
                <p>No medicines found in this category.</p>
            )}
    
      </section>
      </header>
    
      </>
    );
  };

//const AddcartPage = () => {
//    const location = useLocation();
//     const selectedCategory = location.state?.selectedCategory;

//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const toggleMenu = () => {
//       setIsMenuOpen(!isMenuOpen);
//       };
//       const medicines = [
//         {
//           name: 'Paracetamol',
//           category: 'Pain Relief',
//           dosage: '500mg',
//           brand: 'HealthCare',
//           price: 10,
//           image: Asp,
//           quantity: "30 / pax",
//         },
//         {
//           name: 'Ibuprofen',
//           category: 'Anti-inflammatory',
//           dosage: '200mg',
//           brand: 'MediSafe',
//           price: 12,
//           image: Asp,
//           number: "30 / pax",
//         },
//         {
//           name: 'Amoxicillin',
//           category: 'Antibiotic',
//           dosage: '250mg',
//           brand: 'PharmaPlus',
//           price: 15,
//           image: Asp,
//           number: "30 / pax",
//         },
//         {
//           name: 'Cetirizine',
//           category: 'Allergy Relief',
//           dosage: '10mg',
//           brand: 'AllerCare',
//           price: 8,
//           image: Asp,
//           number: "30 / pax",
//         },
//        {
//            name: 'Cetirizine',
//            category: 'Allergy Relief',
//            dosage: '10mg',
//            brand: 'AllerCare',
//            price: 8,
//            image: Asp,
//            number: "30 / pax",
//          },
//          {
//            name: 'Cetirizine',
//            category: 'Allergy Relief',
//            dosage: '10mg',
//            brand: 'AllerCare',
//            price: 8,
//            image: Asp,
//            number: "30 / pax",
//          },
//      ];
//  return (
//    <>
//    <header className="Aheader">
//    <div className="Aoverlay-box">
//    <img src={PharmacyLogo} alt="Pharmacy Logo" className="ALogo"/>
//    <img src={PharmacyLogoNoWords} alt="Pharmacy Logo No Words" className="ALogoNoWords"/>
//      <nav className={`Amain-nav ${isMenuOpen ? 'open' : ''}`}>
//          <ul>
//              {/* <li><a href="/SignupPage">Sign Up</a></li> */}
//              <li><Link to ="/LandingPage">Back to Main</Link></li>
//              <li><Link to="/ViewCartPage">View Cart</Link></li>
//          </ul>
//      </nav>
//      <button className="Ahamburger" onClick={toggleMenu}>
//          <span className="bar"></span>
//          <span className="bar"></span>
//          <span className="bar"></span>
//      </button>
//    </div>
//    <section className="medicine-section">
//      {medicines.map((medicine, index) => (
//        <MedicineCard key={index} medicine={medicine} />
//      ))}
//    </section>
// </header>
//    </>
//  )
//}
export default AddcartPage;