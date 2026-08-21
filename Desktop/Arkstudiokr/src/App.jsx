import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useGLTF, Stage, Loader } from '@react-three/drei';
import { motion } from 'framer-motion';
import { discoData } from './discoData';
import './index.css';

/* 경로 유지 */
import logoImg from './photo/others/logo.png';
import instaIcon from './photo/others/instagram.png';
import youtubeIcon from './photo/others/youtube.png';
import engJun from './photo/engineers/eng_jun.jpg';
/* 🌟 우진님 사진 import 복구 완료 */
import engWoo from './photo/engineers/eng_woo.jpg';

import about1 from './photo/studio/about1.jpg';
import about2 from './photo/studio/about2.jpg';
import about3 from './photo/studio/about3.jpg';
import about4 from './photo/studio/about4.jpg';

import gear1 from './photo/gear/gear1.jpg';
import gear2 from './photo/gear/gear2.jpg';
import gear3 from './photo/gear/gear3.jpg';

const gearData = [
  { category: "MONITORING SYSTEM", items: ["Amphion One25a", "Trinnov NOVA", "Grace design m905", "Credit Sound Cuemixer"] },
  { category: "CONVERTERS", items: ["Universal Audio Apollo x16 × 2", "Dangerous Music CONVERT-AD+"] },
  { category: "HEADPHONES", items: ["Austrian Audio The Composer", "Sennheiser HD600, HD25", "Sony MDR 7506", "Audio Technica ATH-M50x"] },
  { category: "MICROPHONES", items: ["Neumann U 87 Ai", "Neumann M 149 Tube", "Peluso Microphone Lab P-280", "Peluso Microphone Lab P-47 SS","Shure SM7B x4","Shure SM58 x3","Shure SM57"] },
  { category: "OUTBOARD", items: ["Rupert Neve Designs 5059 Satellite","Rupert Neve Designs R6","Empirical Labs EL7 FATSO Jr.","Overstayer Modular Channel 8755DM", "A-Designs Audio HM2EQ Hammer", "Solid State Logic THE BUS+", "Manley Dual Mono Microphone Preamplifier", "BBE Sound Sonic Maximizer", "Kush Audio Clariphonic 500", "Acme Audio Opticom XLA-500", "SPL DeS", "Chandler Limited TG2-500", "BAE Audio 1073MP","Cranborne Audio Camden 500"] }
];

const ratesData = [
  { service: "Recording", personal: "200,000", business: "250,000" },
  { service: "Tune", personal: "150,000", business: "200,000" },
  { service: "Mixing", personal: "가격문의", business: "가격문의" },
  { service: "Mastering", personal: "100,000", business: "150,000" },
];

const PurpleMusicModel = () => {
  const { scene } = useGLTF('/orange_cat_3.glb');
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} rotation={[2, 3.6, 2.14]} />
    </Float>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

function App() {
  const menuItems = ['About', 'Discography', 'Gear', /*'Rates'*/, 'Contact'];
  const [activeYear, setActiveYear] = useState('2026');
  const [visibleCount, setVisibleCount] = useState(8);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleYearChange = (year) => {
    setActiveYear(year);
    setVisibleCount(8); 
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const currentYearData = discoData.find(group => group.category === activeYear)?.items || [];

  return (
    <div className="App">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          <img src={logoImg} alt="ARK STUDIO" />
        </a>
        <div className="nav-right">
          <div className="nav-links">
            {menuItems.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
            ))}
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/arkstudio_kr/" target="_blank" rel="noopener noreferrer"><img src={instaIcon} alt="Instagram" /></a>
            <a href="https://www.youtube.com/@arkstudio_official" target="_blank" rel="noopener noreferrer"><img src={youtubeIcon} alt="YouTube" /></a>
          </div>
        </div>
      </nav>

      <section id="home" style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', background: '#000', zIndex: 0 }}>
        <Canvas style={{ touchAction: 'pan-y' }} camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2.5} color="#ffaa55" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
          <Suspense fallback={null}>
            <Stage environment="studio" intensity={0.3}>
              <PurpleMusicModel />
            </Stage>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </section>

      <div className="content-wrapper">
        
        {/* About */}
        <section id="about" className="section">
          <h2 className="section-title">ABOUT</h2>
          <div className="section-subtitle">Ark Studio Introduction</div>

          <div className="about-gallery">
            <div className="gallery-col">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="hover-grayscale" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
                <img src={about1} alt="Studio 1" style={{ width: '100%', height: 'auto' }} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="hover-grayscale" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
                <img src={about3} alt="Studio 3" style={{ width: '100%', height: 'auto' }} />
              </motion.div>
            </div>
            <div className="gallery-col staggered">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="hover-grayscale" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
                <img src={about2} alt="Studio 2" style={{ width: '100%', height: 'auto' }} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="hover-grayscale" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
                <img src={about4} alt="Studio 4" style={{ width: '100%', height: 'auto' }} />
              </motion.div>
            </div>
          </div>

          <div style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '80px', fontWeight: '400', lineHeight: '1.8' }}>
            <p style={{ color: '#fff', marginBottom: '10px', fontSize: '1.2rem', fontWeight: '500' }}>최고의 사운드를 향한 끊임없는 열정으로, 아티스트의 음악에 깊이와 감동을 더합니다.</p>
            <p>당신의 이야기가 가장 완벽하게 세상에 울려 퍼지도록 함께 고민합니다.<br/>Dedicated to crafting the perfect soundscape for your vision.</p>
          </div>
          
          <h3 style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#fff', letterSpacing: '2px', fontWeight: '600' }}>ENGINEERS</h3>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {/* 🌟 우진님 프로필 복구 완료 */}
            {[ 
              {name: "Junyoung", img: engJun, role: "Mix & Master (Owner)"}, 
              {name: "Woojin", img: engWoo, role: "Mix & Master Engineer"} 
            ].map((eng) => (
              <div key={eng.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '200px' }}>
                <div className="hover-grayscale" style={{ borderRadius: '50%', overflow: 'hidden', width: '160px', height: '160px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
                  <img src={eng.img} alt={eng.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '5px', fontWeight: '600' }}>{eng.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{eng.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Discography */}
        <section id="discography" className="section">
          <h2 className="section-title">DISCOGRAPHY</h2>
          <div className="section-subtitle">Our Portfolios</div>
          
          <div className="year-tabs">
            {discoData.map((yearGroup) => (
              <button 
                key={yearGroup.category} 
                onClick={() => handleYearChange(yearGroup.category)} 
                className={`year-tab-btn ${activeYear === yearGroup.category ? 'active' : ''}`}
              >
                {yearGroup.category}
              </button>
            ))}
          </div>

          <div className="disco-grid">
            {currentYearData.slice(0, visibleCount).map((item, idx) => {
              const finalLink = item.link && item.link.length > 0 
                ? item.link : `https://www.youtube.com/results?search_query=${encodeURIComponent(item.artist + " " + item.album)}`;

              return (
                <motion.a 
                  key={idx} href={finalLink} target="_blank" rel="noreferrer" className="disco-item"
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (idx % 8) * 0.05 }} viewport={{ once: true }}
                >
                  <div className="disco-img-wrapper">
                    <img src={encodeURI(item.img)} alt={item.album} className="album-cover" />
                    <div className="disco-overlay">
                      <h3 className="overlay-album">{item.album}</h3>
                      <p className="overlay-info">{item.artist}</p>
                      <p className="overlay-info" style={{ color: 'var(--accent-gold)' }}>{item.credit}</p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {visibleCount < currentYearData.length && (
            <button className="load-more-btn" onClick={handleLoadMore}>+ VIEW MORE</button>
          )}
        </section>

        {/* Gear */}
        <section id="gear" className="section">
          <h2 className="section-title">GEAR</h2>
          <div className="section-subtitle">Studio Equipment</div>

          <div className="gear-img-grid">
            {[gear1, gear2, gear3].map((g, i) => (
              <div key={i} className="hover-grayscale" style={{ borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <img src={g} alt={`Gear ${i+1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
          
          <div className="gear-text-grid">
            {gearData.map((categoryData, index) => (
              <div key={index} style={{ background: '#111', padding: '25px', borderRadius: '8px', borderTop: '3px solid var(--accent-gold)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '15px', letterSpacing: '2px', fontWeight: '700' }}>{categoryData.category}</h3>
                <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', lineHeight: '2', fontSize: '0.9rem' }}>
                  {categoryData.items.map((item, idx) => (<li key={idx}>- {item}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Rates *}
        <section id="rates" className="section">
          <h2 className="section-title">RATES</h2>
          <div className="section-subtitle">Service Pricing</div>
          
          <div style={{ background: '#111', borderRadius: '8px', padding: '25px', overflowX: 'auto', border: '1px solid var(--border-color)', width: '100%', marginBottom: '20px' }}>
            <table className="rates-table">
              <thead>
                <tr>
                  <th>SERVICE</th>
                  <th>Individual</th>
                  <th>Business</th>
                </tr>
              </thead>
              <tbody>
                {ratesData.map((rate, index) => (
                  <tr key={index}>
                    <td style={{ color: '#fff', fontWeight: '600' }}>{rate.service}</td>
                    <td>{rate.personal}</td>
                    <td>{rate.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.8' }}>
            * 아크 스튜디오는 예약제, 정찰제로 운영되며, 선입금을 원칙으로 합니다.<br/>* 1프로 기준 (3시간 30분)입니다.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <h2 className="section-title">CONTACT</h2>
          <div className="section-subtitle">Get in Touch</div>

          <div style={{ width: '100%', textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ fontSize: '1.5rem', color: '#fff', fontWeight: '600', marginBottom: '15px' }}>+82 10 8975 7064</p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>arkstudio@naver.com</p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>서울 마포구 성미산로 85, 4층</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>주차 문의 (Parking Available)</p>
          </div>
          
          <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <iframe title="Map" width="100%" height="100%" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.775811776993!2d126.914588!3d37.560361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98da5bc36cbb%3A0xc3f5fbcdb2f91c98!2z7ISc7Jq47Yq567OE7IucIOuniO2PrOq1rCDshLHrr7jsgrDroZwgODU!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr" style={{ border: 0 }}></iframe>
          </div>
        </section>

        <footer className="footer">
          <p>© 2026 ARK STUDIO. ALL RIGHTS RESERVED.</p>
        </footer>

      </div>

      <Loader 
        containerStyles={{ background: '#050505' }}
        innerStyles={{ backgroundColor: '#222', width: '200px', height: '2px', borderRadius: '2px' }}
        barStyles={{ backgroundColor: '#ff6f00', height: '2px', borderRadius: '2px' }}
        dataInterpolation={(p) => `Loading Workspace ${p.toFixed(0)}%`}
      />
    </div>
  );
}

export default App;