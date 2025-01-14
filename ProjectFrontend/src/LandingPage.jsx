import React, { useState ,useEffect} from 'react';
import "./LandingPage.css";
import promo1 from "./assets/Promo1.jpg";
import promo2 from "./assets/Promo2.jpg";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
  };

   // Array of slider images
   const slides = [
    {
      image: [promo1], // Replace with your image paths
      // title: "Promotion 1",
    },
    {
      image: [promo2],
      // title: "Promotion 2",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slides every 3 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, [slides.length]);

  return (
      <>
      <header className="header">
          <div className="overlay-box">
          </div>
          <div className="logo">
              CAT Pharmacy
          </div>
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                  <li><a href="/SignupPage">Sign Up</a></li>
                  <li><a href="/LoginPage">Log in</a></li>
                  <li><a href="/ViewCart">View Cart</a></li>
              </ul>
          </nav>
          <button className="LPhamburger" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
          </button>
          {/* <div className="LP_Slider">
             <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
               className="slider-image"
             />
         <h1>{slides[currentSlide].title}</h1>
        </div> */}
      </header>
      </>
  )
}

export default LandingPage