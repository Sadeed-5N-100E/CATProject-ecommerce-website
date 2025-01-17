import React, { useState ,useEffect} from 'react';
import "./AddcartPage.css"

const AddcartPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      };

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
            <li><a href="/LandingPage">back to Main</a></li>
            <li><a href="/ViewCartPage">View Cart</a></li>
        </ul>
    </nav>
    <button className="Ahamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </button>
    </div>
</header>

    <div>AddcartPage</div>
    </>
  )
}

export default AddcartPage