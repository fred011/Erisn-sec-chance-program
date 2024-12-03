import { Link } from "react-scroll";
import "./LandingPage.css";
import logo from "../../Images/ERISN LOGO.png";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_t1ikomh", "template_yu7c0hs", form.current, {
        publicKey: "7WqT1OXOpLHZLPDPH",
      })
      .then(
        () => {
          console.log("Message sent successfully!");
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.log("Failed to send message.", error.text);
          alert("Failed to send message.");
        }
      );
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="parent">
      <header className="top-header">
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>

        <nav className="navbar">
          <Link
            to="/"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            href="/"
          >
            Home
          </Link>

          <Link
            to="features"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            href="#features"
          >
            Key Features
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            href="#contact"
          >
            Contact us
          </Link>
        </nav>

        <div className="btns">
          <button className="login" onClick={handleRegister}>
            Register
          </button>
          <button className="login" onClick={handleSignIn}>
            Log In
          </button>
        </div>
      </header>
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>Welcome to the Erisn Empowerment Program`s</h1>
          <span> Students Management System</span>
          <button className="start-btn" onClick={handleRegister}>
            Get Started
          </button>
        </div>
      </section>
      <section id="features" className="key-features">
        <div className="title">Key Features</div>
        <div className="cards">
          <div className="card one">
            <div className="card-title">Student Records</div>
            <img src="" alt="" />
          </div>
          <div className="card two">
            <div className="card-title">Admission Management</div>
            <img src="" alt="" />
          </div>
          <div className="card three">
            <div className="card-title">Fee Management</div>
            <img src="" alt="" />
          </div>
          <div className="card four">
            <div className="card-title">Students` behaviour Tracking</div>
            <img src="" alt="" />
          </div>
          <div className="card five">
            <div className="card-title">Library Management</div>
            <img src="" alt="" />
          </div>
          <div className="card six">
            <div className="card-title">Alerts and Notifications</div>
            <img src="" alt="" />
          </div>
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="title">Contact Us</div>

        <div className="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <h2>Get In Touch</h2>
            <div className="input-box">
              <label>Full Name*</label>
              <input
                type="text"
                className="field"
                placeholder="Enter your name"
                name="user_name"
                required
              />
            </div>
            <div className="input-box">
              <label>Email*</label>
              <input
                type="email"
                className="field"
                placeholder="Enter your email"
                name="user_email"
                required
              />
            </div>
            <div className="input-box">
              <label>Your Query*</label>
              <textarea
                id=""
                className="field message"
                placeholder="Enter your query"
                name="user_message"
                required
              ></textarea>
            </div>
            <button type="submit" value="Send">
              Send Query
            </button>
          </form>
        </div>
      </section>
      <footer className="footer">
        <p>© 2024 Erisn Empowerment Program | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
