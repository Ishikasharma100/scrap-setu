import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  LockKeyhole,
  Recycle,
  UserRound,
  X,
} from "lucide-react";

import "./index.css";

function App() {
  const [loginRole, setLoginRole] = useState(null);

  const openLogin = (role) => {
    setLoginRole(role);
  };

  const closeLogin = () => {
    setLoginRole(null);
  };

  return (
    <div className="scrapsetu-app">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="topbar">

        {/* BRAND */}

        <div className="brand">

          <div className="brand-logo">
            <img
              src="/logo.jpeg"
              alt="ScrapSetu logo"
            />
          </div>

          <div className="brand-name">
            <span>SCRAP</span>
            <span>SETU</span>

            <small>E-WASTE NETWORK</small>
          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="navigation">

          <a href="#home">
            Home
          </a>

          <a href="#roles">
            How it works
          </a>

          <a href="#network">
            The network
          </a>

          <a href="#impact">
            Impact
          </a>

        </nav>


        {/* RIGHT SIDE */}

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
          HERO
      ===================================================== */}

      <main
        className="hero"
        id="home"
      >

        {/* BACKGROUND IMAGE */}

        <img
          src="/scrapsetu-hero.png"
          alt="Collector handling electronic waste"
          className="hero-image"
        />


        {/* DARK GREEN OVERLAY */}

        <div className="hero-dark"></div>


        {/* VIGNETTE */}

        <div className="hero-vignette"></div>


        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <section className="hero-content">

          <div className="eyebrow">

            <span></span>

            SMART E-WASTE CONNECTOR

          </div>


          <h1>

            SCRAP

            <span>
              SETU
            </span>

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


        {/* =================================================
            COLLECTOR / RECYCLER PANEL
        ================================================= */}

        <section
          className="role-panel"
          id="roles"
        >

          <div className="role-heading">
            CHOOSE YOUR SIDE
          </div>


          {/* COLLECTOR */}

          <button
            className="role-card collector-card"
            onClick={() => openLogin("collector")}
          >

            <div className="role-symbol">

              <UserRound size={21} />

            </div>


            <div className="role-info">

              <small>
                FOR COLLECTORS
              </small>

              <strong>
                Collector
              </strong>

              <p>
                Collect and connect e-waste.
              </p>

            </div>


            <div className="role-arrow">

              <ArrowUpRight size={18} />

            </div>

          </button>


          {/* RECYCLER */}

          <button
            className="role-card recycler-card"
            onClick={() => openLogin("recycler")}
          >

            <div className="role-symbol">

              <Recycle size={21} />

            </div>


            <div className="role-info">

              <small>
                FOR RECYCLERS
              </small>

              <strong>
                Recycler
              </strong>

              <p>
                Receive and recycle responsibly.
              </p>

            </div>


            <div className="role-arrow">

              <ArrowUpRight size={18} />

            </div>

          </button>

        </section>


        {/* =================================================
            BOTTOM INDICATOR
        ================================================= */}

        <div className="hero-bottom">

          <span>
            01
          </span>

          <i></i>

          <span>
            SCRAPSETU
          </span>

        </div>

      </main>


      {/* =====================================================
          NETWORK SECTION
      ===================================================== */}

      <section
        className="minimal-section"
        id="network"
      >

        <span>
          THE NETWORK
        </span>

        <h2>
          Collector.
          <br />
          Recycler.
          <br />
          One connected cycle.
        </h2>

      </section>


      {/* =====================================================
          IMPACT SECTION
      ===================================================== */}

      <section
        className="minimal-section minimal-section-light"
        id="impact"
      >

        <span>
          IMPACT
        </span>

        <h2>
          E-waste moves
          <br />
          forward.
        </h2>

      </section>


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


            {/* CLOSE BUTTON */}

            <button
              className="close-login"
              onClick={closeLogin}
              aria-label="Close login"
            >

              <X size={19} />

            </button>


            {/* MODAL BRAND */}

            <div className="modal-brand">

              <div className="modal-logo">

                <img
                  src="/logo.jpeg"
                  alt="ScrapSetu logo"
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


            {/* LOGIN TITLE */}

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


            {/* EMAIL */}

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


            {/* PASSWORD */}

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


            {/* LOGIN BUTTON */}

            <button className="login-submit">

              Sign in

              <ArrowRight size={17} />

            </button>


            {/* CHANGE ROLE */}

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