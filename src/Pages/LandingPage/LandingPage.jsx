import { Link } from "react-scroll";
import "./LandingPage.css";
import logo from "../../Images/ERISN LOGO.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signInAsPage");
  };

  return (
    <div>
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

        <button className="login" onClick={handleSignIn}>
          Sign In
        </button>
      </header>
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>Welcome to the Erisn Empowerment Program`s</h1>
          <span> Students Management System</span>
          <button className="start-btn" onClick={handleSignIn}>
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
          <form action="">
            <h2>Get In Touch</h2>
            <div className="input-box">
              <label>Full Name*</label>
              <input
                type="text"
                className="field"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="input-box">
              <label>Email*</label>
              <input
                type="email"
                className="field"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-box">
              <label>Your Query*</label>
              <textarea
                name=""
                id=""
                className="field message"
                placeholder="Enter your query"
                required
              ></textarea>
            </div>
            <button type="submit">Send Query</button>
          </form>
        </div>
      </section>
      <footer className="footer">
        <div className="copyright">
          <p>© 2024 Erisn Empowerment Program | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
