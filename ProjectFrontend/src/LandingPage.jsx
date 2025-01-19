import React, { useState ,useEffect, useContext} from 'react';
import "./LandingPage.css";
import ColdnFlu from "./assets/CategoryColdnFlu.jpg";
import PainRelief from "./assets/CategoryPainRelief.jpeg";
import FirstAid from "./assets/CategoryFirstAid.jpg";
import DigestiveHealth from "./assets/CategoryDigestiveHealth.jpg";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PharmacyLogo from "./assets/LoginPageAssets/RoyalHarapanPharmacy.png";
import PharmacyLogoNoWords from "./assets/LoginPageAssets/PharmacyLogo.png";
import { AuthContext } from './AuthContext';
import Modal from './Modal';


const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { isLoggedIn } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    {
      image: PainRelief,
      title: "Pain relief",
      description: "Pain relief medicine, also known as analgesics, are drugs designed to reduce or eliminate pain. They work by targeting the underlying causes of pain or by interrupting the pain signals in the nervous system.",
      link: "/AddcartPage",
    },
    {
      image: ColdnFlu,
      title: "Cold and Flu",
      description: "Cold and flu are both respiratory illnesses caused by viruses, but they are caused by different types of viruses.",
      link: "/AddcartPage",
    },
    {
      image: DigestiveHealth,
      title: "Digestive Health",
      description: "Digestive problems refer to issues with the digestive system, which includes the stomach, intestines, and other organs involved in digestion. Common problems include indigestion, bloating, constipation, diarrhea, acid reflux, and irritable bowel syndrome (IBS).",
      link: "/AddcartPage",
    },
    {
      image: FirstAid,
      title: "First Aid",
      description: "First aid is the immediate care provided to a person who is injured or suddenly ill before professional medical help is available. It involves simple, often life-saving techniques to prevent further harm, alleviate pain, or stabilize the person.",
      link: "/AddcartPage",
    },
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (link, category) => {
    if (isLoggedIn) {
        navigate(link, { state: { selectedCategory: category } }); // Pass the selected category
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
        setMessage('');
    } else {
        setMessage("Login required to access this page.");
    }
  };

  const closeModal = () => {
    setMessage('');
  };

  const infoParagraphs = [
    "Here are some important details about our products and services. You can explore more in each category section below, where we explain our offerings in more detail. We currently offer four categories for customers: Pain Relief, First Aid, Cold and Flu, and Digestive Health. Customers can explore these categories by clicking on the respective links.",
    "Clarification: Our products are sourced from external suppliers and are not manufactured by this pharmacy. Additionally, we would like to clarify that all customer transaction histories are recorded."
  ];

  return (
      <>
        <Modal message={message} onClose={closeModal} />
        <header className="Lheader">
          <div className="overlay-box">
      
          <img src={PharmacyLogo} alt="Pharmacy Logo" className="LPLogo"/>
          <img src={PharmacyLogoNoWords} alt="Pharmacy Logo No Words" className="LPLogoNoWords"/>
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                  {!isLoggedIn && (
                    <>
                      <li><Link to="/SignupPage">Sign Up</Link></li>
                      <li><Link to="/LoginPage">Log in</Link></li>
                    </>
                  )}
                  <li><Link to="/ViewCartPage">View Cart</Link></li>
              </ul>
          </nav>
          <button className="LPhamburger" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
          </button>
        </div>
      {/* Information Box */}
      <div className="info-box">
        <h2 className="info-title">Important Information</h2>
        <div className="info-details">
        {infoParagraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      </div>
      </div>

      </header>

       {/* Categories Section */}
      <section className="categories-section">
        <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            {categories.map((category, index) => (
              <div className="category-box" key={index}>
                <img src={category.image} alt={category.title} className="category-image" />
                <div className="category-details">
                  <h3 className="category-title">{category.title}</h3>
                  <p className="category-description">{category.description}</p>
                  <button
                    className="category-button"
                    onClick={() => handleCategoryClick(category.link, category.title)}
                  >
                      Check This Out
                  </button>
                </div>
              </div>
            ))}
            </div>
        </section>
      </>
  )
}

export default LandingPage;