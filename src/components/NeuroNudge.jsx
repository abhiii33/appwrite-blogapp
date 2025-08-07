import React, { useState, useEffect, useRef } from 'react';
import './NeuroNudge.css';

const NeuroNudge = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);
  const happySoundRef = useRef(null);
  const soundOneRef = useRef(null);
  const soundTwoRef = useRef(null);

  useEffect(() => {
    // Initialize audio elements
    bgMusicRef.current = new Audio('/assets/Sounds/bg-music.mp3');
    clickSoundRef.current = new Audio('/assets/Sounds/click.wav');
    happySoundRef.current = new Audio('/assets/Sounds/Click-happy-sound.mp3');
    soundOneRef.current = new Audio('/assets/Sounds/soundone.mp3');
    soundTwoRef.current = new Audio('/assets/Sounds/soundtwo.mp3');

    bgMusicRef.current.loop = true;

    return () => {
      // Cleanup audio elements
      [bgMusicRef, clickSoundRef, happySoundRef, soundOneRef, soundTwoRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
    };
  }, []);

  const toggleMusic = () => {
    if (bgMusicRef.current) {
      if (isMusicPlaying) {
        bgMusicRef.current.pause();
      } else {
        bgMusicRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.log('Click sound failed:', e));
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    playClickSound();
  };

  return (
    <div className="neuronudge-app">
      {/* Audio Controls */}
      <div className="audio-controls">
        <button onClick={toggleMusic} className="music-toggle">
          <i className={`fas ${isMusicPlaying ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
        </button>
      </div>

      {/* Sidebar Menu */}
      <div id="appmenu" className={`app-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <div id="mainMenu" className={`main-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="menu-background-wrapper">
            <div className="menu-background"></div>
          </div>
          
          <div className="menu-quick-options">
            <div className="socialicons-wrapper">
              <div className="social-icon">
                <a href="https://www.instagram.com/ballisticlearningsystems/" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src="/assets/social/instagram.svg" alt="Instagram" />
                </a>
              </div>
              <div className="social-icon">
                <a href="https://www.linkedin.com/company/ballisticlearning/" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src="/assets/social/linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
              <div className="social-icon">
                <a href="https://twitter.com/ballisticlearn1" target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src="/assets/social/twitter.svg" alt="Twitter" />
                </a>
              </div>
              <div className="social-icon">
                <a href="mailto:enquiry@ballisticlearning.com">
                  <img loading="lazy" src="/assets/social/email.svg" alt="Mail" />
                </a>
              </div>
            </div>
            
            <div className="menu-navigation">
              <nav>
                <ul>
                  <li><a href="#home" onClick={playClickSound}>Home</a></li>
                  <li><a href="#about" onClick={playClickSound}>About</a></li>
                  <li><a href="#services" onClick={playClickSound}>Services</a></li>
                  <li><a href="#contact" onClick={playClickSound}>Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <section id="home" className="hero-section">
          <div className="container">
            <div className="row align-items-center min-vh-100">
              <div className="col-lg-6">
                <div className="hero-content">
                  <h1 className="hero-title">
                    <span className="gradient-text">NeuroNudge</span>
                  </h1>
                  <p className="hero-subtitle">Rewiring Human Minds for the AI Era</p>
                  <p className="hero-description">
                    Transform your cognitive abilities with cutting-edge neurotechnology. 
                    Join the revolution in human-AI collaboration and unlock your mind's potential.
                  </p>
                  <div className="hero-buttons">
                    <button className="btn btn-primary btn-lg me-3" onClick={playClickSound}>
                      Get Started
                    </button>
                    <button className="btn btn-outline-light btn-lg" onClick={playClickSound}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-visual">
                  <div className="neural-network">
                    <div className="node node-1"></div>
                    <div className="node node-2"></div>
                    <div className="node node-3"></div>
                    <div className="connection connection-1"></div>
                    <div className="connection connection-2"></div>
                    <div className="connection connection-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-title">About NeuroNudge</h2>
                <p className="section-description">
                  We're at the forefront of neuroplasticity research, developing innovative 
                  solutions that enhance human cognitive abilities for the AI era. Our mission 
                  is to bridge the gap between human intelligence and artificial intelligence.
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-brain"></i>
                  </div>
                  <h3>Cognitive Enhancement</h3>
                  <p>Advanced techniques to improve memory, focus, and learning capacity.</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-robot"></i>
                  </div>
                  <h3>AI Integration</h3>
                  <p>Seamless collaboration between human intelligence and AI systems.</p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="feature-card">
                  <div className="feature-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3>Performance Tracking</h3>
                  <p>Real-time monitoring and optimization of cognitive performance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-title">Our Services</h2>
                <p className="section-description">
                  Discover how NeuroNudge can transform your cognitive abilities and 
                  prepare you for the future of human-AI collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-title">Get in Touch</h2>
                <p className="section-description">
                  Ready to unlock your cognitive potential? Contact us to learn more 
                  about NeuroNudge and how we can help you thrive in the AI era.
                </p>
                <div className="contact-info mt-4">
                  <p>
                    <i className="fas fa-envelope me-2"></i>
                    <a href="mailto:enquiry@ballisticlearning.com">enquiry@ballisticlearning.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Background overlay for menu */}
      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default NeuroNudge;