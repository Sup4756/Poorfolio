"use client";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Center } from "@react-three/drei";
import { Model as Model3D } from "@/components/Avatar";

export default function Home() {

  // Section Refs
  const introductionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const mentionsRef = useRef<HTMLDivElement>(null);
  const findMeRef = useRef<HTMLDivElement>(null);
  const creationsRef=useRef<HTMLDivElement>(null);

  // State for troll image
  const [showTroll, setShowTroll] = useState(false);

  // Smooth scroll
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle troll button click
  const handleTrollClick = () => {
    setShowTroll(true);
    setTimeout(() => {
      setShowTroll(false);
    }, 2000);
  };

  return (
    <div className="MAINPAGE relative min-h-screen">
      {/* ===== Troll Overlay ===== */}
      {showTroll && (
        <div className="TROLL-OVERLAY">
          <div className="TROLL-CONTAINER">
            {/* <img src="/pngs/Trollface.png" alt="Troll" className="TROLL-IMAGE" /> */}
          </div>
        </div>
      )}

      {/* ===== Header ===== */}
      <header className="HEADER relative z-10">
        <div className="USERNAME">
          <h1>✦ Sup ✦</h1>
        </div>

        <div className="LINKS">
          <nav>
            <a onClick={() => scrollToSection(introductionRef)}>Introduction</a>
            <a onClick={() => scrollToSection(detailsRef)}>Details</a>
            <a onClick={() => scrollToSection(creationsRef)}>Creations</a>
            <a onClick={() => scrollToSection(findMeRef)}>Find me</a>
          </nav>
        </div>

        <div className="CONTACT">
          <button onClick={handleTrollClick}>Click for nothing</button>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <div ref={introductionRef} className="ABOUT" id="introduction">
        {/* LEFT: Avatar 3D */}
        <div className="ABOUT-LEFT">
          <div className="TITLE-LEFT">
            <p>✨ The avatar of Sup ✨</p>
          </div>

          <div className="relative w-full h-[400px] overflow-hidden">
            <div className="FRAME absolute inset-0 w-full h-full z-10 pointer-events-none" />

            <div className="model-container absolute inset-0 w-full h-full overflow-hidden rounded-[40px] rounded-tl-[120px] rounded-tr-[120px]">
              <Canvas camera={{ position: [0, 0, 8], fov: 100 }}>
                <Stage intensity={0.6} environment="city" adjustCamera={false} center={{ disable: true }} shadows={false}>
                  <Center top position={[0, -5, 0]}>
                    <Model3D />
                  </Center>
                </Stage>
                <OrbitControls enableZoom={false} makeDefault />
              </Canvas>
            </div>
          </div>
        </div>

        {/* RIGHT: About Me */}
        <div className="ABOUT-RIGHT">
          <div className="TITLE">
            <p>🌸 About me</p>
          </div>

          <div className="CONTENT">
            <p>
              - Hello I am Sup, but you can refer to me as anything!<br />
              - I like Item Asylum (IA). I spend most of the time playing with my chill friends.<br />
              - I also play Tower Defense Simulator (TDS). ✨
            </p>
          </div>
        </div>
      </div>

      {/* ===== Details Section ===== */}
      <div ref={detailsRef} className="DETAILS-SECTION" id="details">
        <h2>✦ About me in details</h2>
        <div className="DETAILS-GRID">
          <div className="DETAILS-CARD">
            <h3>🎨 Hobbies</h3>
            <ul>
              <li>Drawing arts (kind of retired now)</li>
              <li>Play video games</li>
              <li>Touch grass 🌿</li>
            </ul>
          </div>
          <div className="DETAILS-CARD">
            <h3>💼 What I do</h3>
            <ul>
              <li>Make classic clothing</li>
              <li>Sleep all day long 😴</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Work Showcase ===== */}
      <div ref ={creationsRef} className="WORK-SHOWCASE">
        <h2>🌟 My Featured Creations</h2>
        <div className="WORK-GRID">

          {/* Classic Shirts */}
          <div className="WORK-ITEM">
            <div style={{ width: '100%' }}>
              <h4 style={{marginBottom:'15px'}}>Classic Shirts</h4>
              <div className="SHIRT-ITEMS">
                <a href="https://www.roblox.com/catalog/115713894142464/Red-shirt-white-t-shirt-cartoony" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Shirt 1.png" alt="Shirt 1" />
                  <span className="SHIRT-LABEL">Shirt 1</span>
                </a>
                <a href="https://www.roblox.com/catalog/17677377064/Little-John-Roland-Plok" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Shirt 2.png" alt="Shirt 2" />
                  <span className="SHIRT-LABEL">Shirt 2</span>
                </a>
                <a href="https://www.roblox.com/catalog/17677364200/Little-John-Roland-Plok" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Shirt 3.png" alt="Shirt 3" />
                  <span className="SHIRT-LABEL">Shirt 3</span>
                </a>
                <a href="https://www.roblox.com/catalog/17114237162/Purple-apron-with-black-white-fur-Roland-Plok" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Shirt 4.png" alt="Shirt 4" />
                  <span className="SHIRT-LABEL">Shirt 4</span>
                </a>
                <a href="https://www.roblox.com/catalog/16105923596/Evil-Shirt-Roland-Plok" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Shirt 5.png" alt="Shirt 5" />
                  <span className="SHIRT-LABEL">Shirt 5</span>
                </a>
              </div>
            </div>
          </div>


          
          {/* Classic Pants */}
          <div className="WORK-ITEM">
            <div style={{ width: '100%' }}>
              <h4 style={{ marginBottom: '15px' }}>Classic Pants</h4>
              <div className="SHIRT-ITEMS">
                <a href="https://www.roblox.com/catalog/96657564035371/Blue-pants-cartoony" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Pants 1.png" alt="Shirt 1" />
                  <span className="SHIRT-LABEL">Pants 1</span>
                </a>
                <a href="https://www.roblox.com/catalog/96657564035371/Blue-pants-cartoony" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Pants 2.png" alt="Shirt 2" />
                  <span className="SHIRT-LABEL">Pants 2</span>
                </a>
                <a href="https://www.roblox.com/catalog/92975984998103/TDS-Wonderland-Teto-Commander-Classic-Pants" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Pants 3.png" alt="Shirt 3" />
                  <span className="SHIRT-LABEL">Pants 3</span>
                </a>
                <a href="https://www.roblox.com/catalog/132835255756436/Jellyfish-Electroshocker-Improved" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Pants 4.png" alt="Shirt 4" />
                  <span className="SHIRT-LABEL">Pants 4</span>
                </a>
                <a href="https://www.roblox.com/catalog/14941470357/Purple-apron-with-black-white-fur-Roland-Plok" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Pants 5.png" alt="Shirt 5" />
                  <span className="SHIRT-LABEL">Pants 5</span>
                </a>
                <a href="https://www.roblox.com/catalog/16105926138/Evil-Pants-Roland-Plok" target="_blank" rel="noopener noreferrer" className="SHIRT-WRAPPER" style={{ textDecoration: 'none' }}>
                  <img className="ITEMS" src="/pngs/Pants 6.png" alt="Shirt 6" />
                  <span className="SHIRT-LABEL">Pants 6</span>
                </a>
              </div>
              <div className="WORK-ACTIONS">
                <a href="https://www.roblox.com/catalog/115713894142464/Red-shirt-white-t-shirt-cartoony" target="_blank" rel="noopener noreferrer">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mentions ===== */}
      <div ref={mentionsRef} className="DETAILS-SECTION" id="mentions" style={{ marginTop: '0' }}>
        <h2>📢 Mentions</h2>
        <div className="DETAILS-CARD" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <div className="MENTIONS-GRID">
            <div className="MENTION-ITEM">
              <span className="MENTION-ICON"></span>
              <span>Phlox</span>
              <img className="MENTION-AVATAR" src="/pngs/Phlox.png" alt="Phlox" />
            </div>
            <div className="MENTION-ITEM">
              <span className="MENTION-ICON"></span>
              <span>Denz</span>
              <img className="MENTION-AVATAR" src="/pngs/Denz.png" alt="Denz" />
            </div>
            <div className="MENTION-ITEM">
              <span className="MENTION-ICON"></span>
              <span>Ultrakill</span>
              <img className="MENTION-AVATAR" src="/pngs/Ultrakill.png" alt="Ultrakill" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div ref={findMeRef} className="FOOTER" id="findme">
        <div className="FOOTER-TITLE">🌸 Find me</div>
        <div className="FOOTER-LINKS">
          <a href="https://www.roblox.com/users/438249299/profile" target="_blank" rel="noopener noreferrer">
            Roblox
          </a>
          <a href="https://x.com/ItsSup4756" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <span>Discord: its_sup</span>
          <span>UID: 691134554894893116</span>
        </div>
      </div>
    </div>
  );
}