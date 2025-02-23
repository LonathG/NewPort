import { useEffect, useRef } from "react";
import "./App.css";

// Import images if stored in 'src/assets'
import landing from "./assets/img/landing.png";
import artboard2 from "./assets/img/Artboard2.png";
import artboard3 from "./assets/img/Artboard3.png";
import artboard4 from "./assets/img/Artboard4.png";
import artboard42 from "./assets/img/Artboard4-2.png";
import artboard8 from "./assets/img/Artboard8.png";
import artboard6 from "./assets/img/Artboard6.png";
import backToTopIcon from "./assets/img/up-arrow_892692.png";
import facebookIcon from "./assets/img/facebook.png";
import instagramIcon from "./assets/img/instagram.png";
import linkedinIcon from "./assets/img/linkedin.png";

function App() {
  const revealElementsRef = useRef([]);
  const backToTopButtonRef = useRef(null);

  useEffect(() => {
    const revealElements = revealElementsRef.current;
    const backToTopButton = backToTopButtonRef.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const revealOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
    revealElements.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    };

    const handleBackToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    backToTopButton.addEventListener("click", handleBackToTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      backToTopButton.removeEventListener("click", handleBackToTop);
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <section className="content">
        {[landing, artboard2, artboard3, artboard4, artboard42, artboard8, artboard6].map((src, index) => (
          <div className="reveal" key={index} ref={(el) => (revealElementsRef.current[index] = el)}>
            <img src={src} alt={`Artboard ${index + 1}`} />
          </div>
        ))}
      </section>

      <div id="back-to-top" className="back-to-top" ref={backToTopButtonRef}>
        <img src={backToTopIcon} alt="Back to Top" />
      </div>
{/* 
      <footer>
        <div className="social-links">
          <button onClick={() => alert("Not connected yet")} className="social-btn">
            <img src={facebookIcon} alt="Facebook" />
          </button>
          <a href="https://www.instagram.com/o__scar_/" className="social-btn" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/lonath-gunawardena-4b6a8624b/" className="social-btn" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
      </footer> */}
    </div>
  );
}

export default App;
