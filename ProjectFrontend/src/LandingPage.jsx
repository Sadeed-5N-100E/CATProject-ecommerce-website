import React, { useState ,useEffect} from 'react';
import "./LandingPage.css";
import promo1 from "./assets/Promo1.jpg";
import promo2 from "./assets/Promo2.jpg";
// import promo3 from "./assets/promo3.jpg";
import HBP from "./assets/HBPCategory.jpg";
import Dia from "./assets/DiaCategory.jpg";
import Cough from "./assets/CoughCategory.jpg";
import HF from "./assets/HFCategory.jpg";
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
      title: "88% Max discount start form 14 Jan",
    },
    {
      image: [promo2],
      title: "Up to 80% Off discount !",
    },
  ];

  const categories = [
    {
      image: promo1,
      title: "High Blood Pessure",
      description: "High Blood Pressure Description",
      link: "/AddcartPage",
    },
    {
      image: Cough,
      title: "Cough",
      description: "Cough desciption",
      link: "/AddcartPage",
    },
    {
      image: HF,
      title: "High Fever",
      description: "High Fever Description",
      link: "/AddcartPage",
    },
    {
      image: Dia,
      title: "Diabetes",
      description: "Diabetes desciption",
      link: "/AddcartPage",
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
      
          <div className="logo">
              CAT Pharmacy
          </div>
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                  <li><a href="/SignupPage">Sign Up</a></li>
                  <li><a href="/LoginPage">Log in</a></li>
                  <li><a href="/ViewCartPage">View Cart</a></li>
              </ul>
          </nav>
          <button className="LPhamburger" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
          </button>
          </div>
          {/* Promotions Section */}
           <h3 className="promotions-title"> ... Promotions ...</h3>
            <div className="LP_Slider">
             <img
              src={slides[currentSlide].image}
              alt={`Slide ${currentSlide + 1}`}
               className="slider-image"
             />
         <h1>{slides[currentSlide].title}</h1>
        </div> 
      </header>

       {/* Categories Section */}
 <section className="categories-section">
 <h2 className="categories-title">Category</h2>
 <div className="categories-container">
   {categories.map((category, index) => (
     <div className="category-box" key={index}>
       <img src={category.image} alt={category.title} className="category-image" />
       <div className="category-details">
         <h3 className="category-title">{category.title}</h3>
         <p className="category-description">{category.description}</p>
         <button
           className="category-button"
           onClick={() => window.location.href = category.link}
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