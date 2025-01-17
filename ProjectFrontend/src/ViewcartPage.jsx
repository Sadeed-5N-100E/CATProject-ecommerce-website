import React, { useState ,useEffect} from 'react';
import "./ViewcartPage.css"
const ViewcartPage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        };
  return (
    <>
    <header className="VCheader">
    <div className="VCoverlay-box">
    <div className="VClogo">
        CAT Pharmacy
    </div>
    <nav className={`VCmain-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
            <li><a href="/LandingPage">Back to main</a></li>
        </ul>
    </nav>
    <button className="VChamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </button>
    </div>
</header>
    </>
  )
}



export default ViewcartPage