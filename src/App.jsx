import { useState, useEffect } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  LockKeyhole,
  Recycle,
  UserRound,
  X,
  Camera,
  Scale,
  IndianRupee,
  Route,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Cpu,
  PackageCheck,
  Leaf,
  Factory,
} from "lucide-react";

import "./index.css";
import RecyclerDashboard from "./assets/recycler/RecyclerDashboard.jsx";

function App() {
  const [loginRole, setLoginRole] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showRecyclerDashboard, setShowRecyclerDashboard] = useState(false);


  const openLogin = (role) => {
    setLoginRole(role);
  };

  const closeLogin = () => {
    setLoginRole(null);
  };

  const steps = [
    {
      number: "01",
      label: "CAPTURE",
      title: "Capture",
      text: "Photograph the e-waste and record what has been collected.",
      icon: Camera,
      image:
        "https://images.pexels.com/photos/9242823/pexels-photo-9242823.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "02",
      label: "IDENTIFY",
      title: "Identify",
      text: "AI-assisted identification suggests the material category from the image.",
      icon: Cpu,
      image:
        "https://images.pexels.com/photos/16310055/pexels-photo-16310055.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "03",
      label: "WEIGH",
      title: "Weigh",
      text: "Record the material weight so the lot can be valued accurately.",
      icon: Scale,
      image:
        "https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "04",
      label: "VALUE",
      title: "Estimate",
      text: "Generate an indicative value using material and weight information.",
      icon: IndianRupee,
      image:
        "https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "05",
      label: "MATCH",
      title: "Match",
      text: "Connect the material with a suitable recycler based on requirements.",
      icon: Route,
      image:
        "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
    {
      number: "06",
      label: "RECYCLE",
      title: "Recycle",
      text: "Complete the handover and move the e-waste toward responsible processing.",
      icon: Recycle,
      image:
        "https://images.pexels.com/photos/33339846/pexels-photo-33339846.jpeg?auto=compress&cs=tinysrgb&w=900",
    },
  ];

  const networkItems = [
    {
      title: "Collection point",
      subtitle: "Collector",
      icon: UserRound,
      position: "node-one",
    },
    {
      title: "Smart matching",
      subtitle: "Location + material",
      icon: MapPin,
      position: "node-two",
    },
    {
      title: "Verified route",
      subtitle: "Traceable movement",
      icon: ShieldCheck,
      position: "node-three",
    },
    {
      title: "Processing facility",
      subtitle: "Recycler",
      icon: Factory,
      position: "node-four",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [steps.length]);
  if (showRecyclerDashboard) {
    return (
      <RecyclerDashboard
        onLogout={() => setShowRecyclerDashboard(false)}
        onExit={() => setShowRecyclerDashboard(false)}
      />
    );
  }

  return (
    <div className="scrapsetu-app">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="topbar">

        <div className="brand">
          <div className="brand-logo">
            <img src="/logo.jpeg" alt="ScrapSetu logo" />
          </div>

          <div className="brand-name">
            <span>SCRAP</span>SETU
            <small>E-WASTE NETWORK</small>
          </div>
        </div>

        <nav className="navigation">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#network">The network</a>
          <a href="#impact">Impact</a>
        </nav>

        <div className="nav-right">

          <div className="network-status">
            <span></span>
            Network active
          </div>

          <button
            className="signin-button"
            onClick={() => openLogin("collector")}
          >
            Sign in
            <ArrowUpRight size={16} />
          </button>

        </div>

      </header>


      {/* =====================================================
          HERO — UNCHANGED
      ===================================================== */}

      <main className="hero" id="home">

        <img
          src="/scrapsetu-hero.png"
          alt="Collector handing electronic waste to a recycler"
          className="hero-image"
        />

        <div className="hero-dark"></div>
        <div className="hero-vignette"></div>

        <section className="hero-content">

          <div className="eyebrow">
            <span></span>
            SMART E-WASTE CONNECTOR
          </div>

          <h1>
            SCRAP
            <span>SETU</span>
          </h1>

          <p>
            Connecting collectors with responsible recyclers.
          </p>

          <div className="hero-actions">

            <button
              className="primary-action"
              onClick={() => openLogin("collector")}
            >
              Enter ScrapSetu
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-action"
              onClick={() => openLogin("recycler")}
            >
              Recycler login
              <ArrowUpRight size={16} />
            </button>

          </div>

        </section>


        <section className="role-panel" id="roles">

          <div className="role-heading">
            CHOOSE YOUR SIDE
          </div>

          <button
            className="role-card collector-card"
            onClick={() => openLogin("collector")}
          >

            <div className="role-symbol">
              <UserRound size={21} />
            </div>

            <div className="role-info">
              <small>FOR COLLECTORS</small>
              <strong>Collector</strong>
              <p>Collect and connect e-waste.</p>
            </div>

            <div className="role-arrow">
              <ArrowUpRight size={18} />
            </div>

          </button>


          <button
            className="role-card recycler-card"
            onClick={() => openLogin("recycler")}
          >

            <div className="role-symbol">
              <Recycle size={21} />
            </div>

            <div className="role-info">
              <small>FOR RECYCLERS</small>
              <strong>Recycler</strong>
              <p>Receive and recycle responsibly.</p>
            </div>

            <div className="role-arrow">
              <ArrowUpRight size={18} />
            </div>

          </button>

        </section>


        <div className="hero-bottom">
          <span>01</span>
          <i></i>
          <span>SCRAPSETU</span>
        </div>

      </main>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="how-section" id="how-it-works">

        <div className="section-shell">

          <div className="section-topline">

            <div>
              <span className="section-kicker">
                HOW IT WORKS
              </span>

              <h2>
                FROM
                <br />
                DISCARDED.
                <br />
                <em>TO DESTINED.</em>
              </h2>
            </div>

            <div className="section-intro">
              <p>
                ScrapSetu turns an informal e-waste handover into a
                traceable journey — from collection to identification,
                valuation, matching and responsible recycling.
              </p>

              <div className="intro-line">
                <span></span>
                ONE CONNECTED FLOW
              </div>
            </div>

          </div>


          {/* INTERACTIVE PROCESS */}

          <div className="process-area">

            <div className="process-line"></div>

            {steps.map((step, index) => {

              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <button
                  className={`process-step ${
                    isActive ? "active-step" : ""
                  }`}
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                >

                  <div className="step-number">
                    {step.number}
                  </div>

                  <div className="step-icon">
                    <Icon size={15} />
                  </div>

                  <span className="step-label">
                    {step.label}
                  </span>

                  <strong>{step.title}</strong>

                  <p>{step.text}</p>

                </button>
              );
            })}

          </div>


          {/* ACTIVE STEP VISUAL */}

          <div className="journey-feature">

            <div className="journey-image">

              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
              />

              <div className="image-overlay"></div>

              <div className="image-badge">
                <span>ACTIVE STAGE</span>
                <strong>{steps[activeStep].number}</strong>
              </div>

            </div>


            <div className="journey-copy">

              <span className="small-label">
                CURRENT JOURNEY
              </span>

              <h3>
                {steps[activeStep].title}
                <br />
                <em>{steps[activeStep].label.toLowerCase()}.</em>
              </h3>

              <p>
                {steps[activeStep].text}
              </p>


              <div className="journey-meta">

                <div>
                  <CheckCircle2 size={15} />
                  <span>Traceable</span>
                </div>

                <div>
                  <CheckCircle2 size={15} />
                  <span>Digital record</span>
                </div>

                <div>
                  <CheckCircle2 size={15} />
                  <span>Responsible flow</span>
                </div>

              </div>


              <div className="journey-progress">

                <div className="progress-top">
                  <span>
                    JOURNEY PROGRESS
                  </span>

                  <strong>
                    {String(activeStep + 1).padStart(2, "0")} / 06
                  </strong>
                </div>

                <div className="progress-track">
                  <span
                    style={{
                      width: `${((activeStep + 1) / 6) * 100}%`,
                    }}
                  ></span>
                </div>

              </div>

            </div>

          </div>


          {/* SMALL FLOW STRIP */}

          <div className="flow-strip">

            <div className="flow-copy">
              <span>ONE LOT · ONE JOURNEY</span>

              <h3>
                Every piece of e-waste
                <br />
                gets a destination.
              </h3>

              <p>
                From the first collection record to the final
                recycling handover, ScrapSetu keeps the journey
                visible and connected.
              </p>
            </div>


            <div className="flow-route">

              <div className="flow-box">
                <PackageCheck size={18} />
                <small>COLLECTED</small>
                <strong>Electronic Lot</strong>
              </div>

              <ArrowRight className="flow-arrow" size={20} />

              <div className="flow-box">
                <ShieldCheck size={18} />
                <small>VERIFIED</small>
                <strong>Safe Route</strong>
              </div>

              <ArrowRight className="flow-arrow" size={20} />

              <div className="flow-box">
                <Recycle size={18} />
                <small>DESTINATION</small>
                <strong>Recycler</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          NETWORK
      ===================================================== */}

      <section className="network-section" id="network">

        <div className="network-shell">

          <div className="network-heading">

            <div>
              <span className="section-kicker">
                THE NETWORK
              </span>

              <h2>
                PEOPLE AT
                <br />
                THE
                <br />
                <em>CENTER</em> OF
                <br />
                RECYCLING.
              </h2>
            </div>

            <div className="network-description">

              <p>
                ScrapSetu creates a connected space where collectors
                and authorized recyclers can work together instead
                of operating in disconnected chains.
              </p>

              <div className="network-stats">

                <div>
                  <strong>01</strong>
                  <span>COLLECTOR</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>SMART MATCH</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>RECYCLER</span>
                </div>

              </div>

            </div>

          </div>


          {/* NETWORK VISUAL */}

          <div className="network-visual">

            <div className="network-glow"></div>

            <div className="network-ring ring-one"></div>
            <div className="network-ring ring-two"></div>
            <div className="network-ring ring-three"></div>


            {/* CONNECTION SVG */}

            <svg
              className="network-lines"
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
            >

              <path
                d="M120 115 C330 105 350 230 500 260"
                className="network-path"
              />

              <path
                d="M880 115 C680 100 650 225 500 260"
                className="network-path"
              />

              <path
                d="M500 260 C650 290 710 400 840 405"
                className="network-path"
              />

              <path
                d="M500 260 C370 310 290 405 145 405"
                className="network-path"
              />

            </svg>


            {/* CENTRAL NODE */}

            <div className="central-network-node">

              <div className="central-icon">
                <Recycle size={31} />
              </div>

              <strong>SCRAPSETU</strong>

              <span>
                CONNECTED NETWORK
              </span>

            </div>


            {/* NETWORK NODES */}

            {networkItems.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  className={`network-node ${item.position}`}
                  key={item.title}
                >

                  <div className="node-icon">
                    <Icon size={17} />
                  </div>

                  <div>
                    <small>{item.subtitle}</small>
                    <strong>{item.title}</strong>
                  </div>

                  <span className="node-dot"></span>

                </div>
              );

            })}


            <div className="network-live">
              <span></span>
              NETWORK LIVE
            </div>

          </div>


          {/* NETWORK CARDS */}

          <div className="network-cards">

            <article className="network-card">

              <div className="network-card-icon">
                <UserRound size={18} />
              </div>

              <span>01</span>

              <h3>Collector</h3>

              <p>
                Record collected material, weight and handover details.
              </p>

            </article>


            <article className="network-card network-card-featured">

              <div className="network-card-icon">
                <Route size={18} />
              </div>

              <span>02</span>

              <h3>Smart connection</h3>

              <p>
                Use material and location information to connect the
                right lot with the right destination.
              </p>

            </article>


            <article className="network-card">

              <div className="network-card-icon">
                <Factory size={18} />
              </div>

              <span>03</span>

              <h3>Recycler</h3>

              <p>
                Receive suitable lots for responsible processing.
              </p>

            </article>

          </div>


          {/* REAL WORLD IMAGE ROW */}

          <div className="network-photo-grid">

            <div className="photo-card large-photo">

              <img
                src="https://images.pexels.com/photos/15432187/pexels-photo-15432187.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="E-waste collection"
              />

              <div className="photo-card-overlay"></div>

              <div className="photo-caption">
                <span>COLLECTION</span>
                <strong>Where the journey begins.</strong>
              </div>

            </div>


            <div className="photo-card">

              <img
                src="https://images.pexels.com/photos/33339846/pexels-photo-33339846.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="E-waste recycling"
              />

              <div className="photo-card-overlay"></div>

              <div className="photo-caption">
                <span>PROCESSING</span>
                <strong>Where waste gets a second route.</strong>
              </div>

            </div>


            <div className="network-photo-text">

              <span>FROM HANDOVER</span>

              <h3>
                To a more
                <br />
                responsible
                <br />
                <em>destination.</em>
              </h3>

              <p>
                The network is designed around people, material
                movement and responsible recycling — not just data.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          IMPACT
      ===================================================== */}

      <section className="impact-section" id="impact">

        <div className="impact-shell">

          <div className="impact-heading">

            <span className="section-kicker">
              IMPACT
            </span>

            <h2>
              E-WASTE
              <br />
              MOVES
              <br />
              <em>FORWARD.</em>
            </h2>

            <p>
              ScrapSetu is designed to make the movement of
              electronic waste more visible, measurable and
              responsible.
            </p>

          </div>


          <div className="impact-main-image">

            <img
              src="https://images.pexels.com/photos/9242823/pexels-photo-9242823.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="People working with electronic waste"
            />

            <div className="impact-image-overlay"></div>

            <div className="impact-image-copy">

              <span>THE FULL JOURNEY</span>

              <strong>
                COLLECT.
                <br />
                IDENTIFY.
                <br />
                CONNECT.
                <br />
                RECYCLE.
              </strong>

            </div>

            <div className="impact-image-tag">
              <Leaf size={16} />
              RESPONSIBLE E-WASTE FLOW
            </div>

          </div>


          {/* IMPACT NUMBERS */}

          <div className="impact-grid">

            <div className="impact-stat">

              <span>01</span>

              <strong>Traceable</strong>

              <p>
                Each lot can carry its journey from collection
                toward handover.
              </p>

            </div>


            <div className="impact-stat">

              <span>02</span>

              <strong>Connected</strong>

              <p>
                Collectors and recyclers are brought into one
                digital workflow.
              </p>

            </div>


            <div className="impact-stat">

              <span>03</span>

              <strong>Responsible</strong>

              <p>
                The system is designed around suitable recycling
                destinations.
              </p>

            </div>


            <div className="impact-stat impact-stat-green">

              <Leaf size={25} />

              <strong>
                Better routes.
                <br />
                Better recycling.
              </strong>

              <p>
                Turning discarded electronics into a connected
                recovery journey.
              </p>

            </div>

          </div>


          {/* FINAL CTA */}

          <div className="final-cta">

            <div>

              <span>SCRAPSETU</span>

              <h3>
                Waste doesn't
                <br />
                end here.
              </h3>

            </div>

            <button
              onClick={() => openLogin("collector")}
            >
              Start the journey
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <div className="footer-brand">
          <strong>SCRAP<span>SETU</span></strong>
          <small>E-WASTE NETWORK</small>
        </div>

        <p>
          Connecting collectors with responsible recyclers.
        </p>

        <span>
          © 2026 ScrapSetu
        </span>

      </footer>


      {/* =====================================================
          LOGIN MODAL
      ===================================================== */}

      {loginRole && (

        <div
          className="login-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLogin();
            }
          }}
        >

          <div className="login-modal">

            <button
              className="close-login"
              onClick={closeLogin}
              aria-label="Close login"
            >
              <X size={19} />
            </button>


            <div className="modal-brand">

              <div className="modal-logo">
                <Recycle
                  size={22}
                  strokeWidth={2.5}
                />
              </div>

              <div>

                <strong>
                  SCRAP<span>SETU</span>
                </strong>

                <small>
                  E-WASTE NETWORK
                </small>

              </div>

            </div>


            <div className="login-heading">

              <span>
                {loginRole === "collector"
                  ? "COLLECTOR PORTAL"
                  : "RECYCLER PORTAL"}
              </span>

              <h2>
                {loginRole === "collector"
                  ? "Collector Login"
                  : "Recycler Login"}
              </h2>

            </div>


            <label>
              Email address
            </label>

            <div className="input-wrapper">

              <Mail size={17} />

              <input
                type="email"
                placeholder="Enter your email"
              />

            </div>


            <label>
              Password
            </label>

            <div className="input-wrapper">

              <LockKeyhole size={17} />

              <input
                type="password"
                placeholder="Enter your password"
              />

            </div>


            <button
  className="login-submit"
  onClick={() => {
    if (loginRole === "recycler") {
      setLoginRole(null);
      setShowRecyclerDashboard(true);
    }
  }}
>
  Sign in
  <ArrowRight size={17} />
</button>


            <div className="change-role">

              <span>
                Login as
              </span>

              <button
                onClick={() =>
                  openLogin(
                    loginRole === "collector"
                      ? "recycler"
                      : "collector"
                  )
                }
              >

                {loginRole === "collector"
                  ? "Recycler"
                  : "Collector"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;