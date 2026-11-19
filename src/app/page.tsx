"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import trollFace from "../../public/pngs/Trollface.png";

const AvatarViewer = dynamic(() => import("@/components/AvatarViewer"), {
  ssr: false,
  loading: () => <div className="viewer-message" role="status"><span className="viewer-message-icon" aria-hidden="true">✧</span><p>Getting Sup ready…</p></div>,
});

const navigation = [
  { id: "introduction", label: "Introduction" },
  { id: "details", label: "Details" },
  { id: "creations", label: "Creations" },
  { id: "findme", label: "Find me" },
];

const shirts = [
  { name: "Shirt 1", image: "/pngs/Shirt 1.png", url: "https://www.roblox.com/catalog/115713894142464/Red-shirt-white-t-shirt-cartoony" },
  { name: "Shirt 2", image: "/pngs/Shirt 2.png", url: "https://www.roblox.com/catalog/17677377064/Little-John-Roland-Plok" },
  { name: "Shirt 3", image: "/pngs/Shirt 3.png", url: "https://www.roblox.com/catalog/17677364200/Little-John-Roland-Plok" },
  { name: "Shirt 4", image: "/pngs/Shirt 4.png", url: "https://www.roblox.com/catalog/17114237162/Purple-apron-with-black-white-fur-Roland-Plok" },
  { name: "Shirt 5", image: "/pngs/Shirt 5.png", url: "https://www.roblox.com/catalog/16105923596/Evil-Shirt-Roland-Plok" },
];
const pants = [
  { name: "Pants 1", image: "/pngs/Pants 1.png", url: "https://www.roblox.com/catalog/96657564035371/Blue-pants-cartoony" },
  { name: "Pants 2", image: "/pngs/Pants 2.png", url: "https://www.roblox.com/catalog/96657564035371/Blue-pants-cartoony" },
  { name: "Pants 3", image: "/pngs/Pants 3.png", url: "https://www.roblox.com/catalog/92975984998103/TDS-Wonderland-Teto-Commander-Classic-Pants" },
  { name: "Pants 4", image: "/pngs/Pants 4.png", url: "https://www.roblox.com/catalog/132835255756436/Jellyfish-Electroshocker-Improved" },
  { name: "Pants 5", image: "/pngs/Pants 5.png", url: "https://www.roblox.com/catalog/14941470357/Purple-apron-with-black-white-fur-Roland-Plok" },
  { name: "Pants 6", image: "/pngs/Pants 6.png", url: "https://www.roblox.com/catalog/16105926138/Evil-Pants-Roland-Plok" },
];

function ClothingCollection({ title, items }: { title: string; items: typeof shirts }) {
  return (
    <div className="collection">
      <div className="collection-heading"><h3>{title}</h3><span>{items.length} pieces</span></div>
      <div className="product-grid">
        {items.map((item) => (
          <a className="product" key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.name} — view on Roblox (opens in a new tab)`}>
            <div className="product-image"><Image src={item.image} alt={item.name} width={180} height={180} sizes="(max-width: 480px) 40vw, (max-width: 1000px) 28vw, 180px" /></div>
            <span className="product-name">{item.name}</span>
            <span className="product-link">View on Roblox</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [showTroll, setShowTroll] = useState(false);
  const trollActive = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeTroll = () => { trollActive.current = false; setShowTroll(false); };

  useEffect(() => {
    if (!showTroll) return;
    // Also clean up when CSS animations are disabled or interrupted.
    const timeout = window.setTimeout(() => { trollActive.current = false; setShowTroll(false); }, 250);
    return () => window.clearTimeout(timeout);
  }, [showTroll]);

  useEffect(() => {
    const handleScroll = () => {
      let current = navigation[0].id;
      for (const item of navigation) {
        if ((document.getElementById(item.id)?.getBoundingClientRect().top ?? Infinity) <= 160) current = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = "findme";
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest(".site-header")) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("click", handleClick);
    return () => { document.removeEventListener("keydown", handleKey); document.removeEventListener("click", handleClick); };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="troll-overlay" hidden={!showTroll} aria-hidden="true" onAnimationEnd={closeTroll}>
        <Image src={trollFace} alt="" className="troll-image" fill sizes="100vw" preload unoptimized />
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#introduction" onClick={() => setMenuOpen(false)} aria-label="Sup, back to introduction"><span aria-hidden="true">✿</span> Sup<span className="brand-period">.</span></a>
          <nav className="site-nav" id="site-navigation" aria-label="Main navigation" data-open={menuOpen}>
            {navigation.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined} onClick={() => { setMenuOpen(false); setActiveSection(item.id); }}>{item.label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="troll-button" disabled={showTroll} onClick={() => { if (trollActive.current) return; trollActive.current = true; setShowTroll(true); }}>Click for nothing <span aria-hidden="true">✧</span></button>
            <button ref={menuButton} className="menu-button" aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="page-shell">
        <section className="introduction" id="introduction" aria-labelledby="intro-title">
          <div className="intro-copy">
            <p className="eyebrow"><span aria-hidden="true">✦</span> A little corner of my world</p>
            <h1 id="intro-title">Hello, I’m <span>Sup!</span><Image className="hello-sticker" src="/ICONs/1.png" alt="" width={82} height={68} preload /></h1>
            <p className="intro-description">But you can refer to me as anything! Welcome to my little collection of things I like and things I make.</p>
            <p className="intro-secondary">I like Item Asylum and spend most of my time playing with my chill friends. I also play Tower Defense Simulator.</p>
            <div className="interest-tags" aria-label="Interests"><span>Item Asylum</span><span>Tower Defense Simulator</span><span>Classic clothing</span></div>
            <div className="intro-actions"><a className="primary-button" href="#creations">Explore my creations</a><a className="text-link" href="#findme">Let’s hang out</a></div>
            <div className="intro-note"><span aria-hidden="true">✿</span> Games, good friends & a little creativity.</div>
          </div>
          <div className="avatar-card">
            <div className="avatar-heading"><span><span aria-hidden="true">✦</span> The avatar of Sup</span><span className="avatar-badge">in 3D</span></div>
            <div className="avatar-stage"><AvatarViewer /></div>
            <span className="avatar-sparkle sparkle-one" aria-hidden="true">✧</span><span className="avatar-sparkle sparkle-two" aria-hidden="true">✦</span>
          </div>
        </section>

        <section id="details" className="details-section" aria-labelledby="details-title">
          <div className="section-heading"><div><p className="eyebrow">A bit more about me</p><h2 id="details-title">Behind the avatar<span aria-hidden="true"> ✿</span></h2></div><p>The small things that make me, me.</p></div>
          <div className="details-grid">
            <article className="detail-card"><span className="detail-icon" aria-hidden="true">✎</span><div><h3>My kind of downtime</h3><ul><li>Drawing arts <span>(kind of retired now)</span></li><li>Playing video games</li><li>Touching grass 🌿</li></ul></div></article>
            <article className="detail-card"><span className="detail-icon pink" aria-hidden="true">☾</span><div><h3>What I do</h3><ul><li>Making classic clothing</li><li>Sleeping all day long 😴</li></ul></div></article>
          </div>
        </section>

        <section id="creations" className="creations-section" aria-labelledby="creations-title">
          <div className="section-heading"><div><p className="eyebrow">Made by me</p><h2 id="creations-title">My featured creations<span aria-hidden="true"> ✧</span></h2></div><p>A little wardrobe for your Roblox world.</p></div>
          <ClothingCollection title="Classic Shirts" items={shirts} />
          <ClothingCollection title="Classic Pants" items={pants} />
        </section>

        <section id="mentions" className="mentions-section" aria-labelledby="mentions-title">
          <div className="mentions-copy"><p className="eyebrow">A little shout-out</p><h2 id="mentions-title">Mentions <span aria-hidden="true">♡</span></h2></div>
          <div className="mentions-list">{["Phlox", "Denz", "Ultrakill"].map((name) => <div className="mention" key={name}><Image src={`/pngs/${name}.png`} alt="" width={56} height={56} /><span>{name}</span></div>)}</div>
        </section>

        <footer id="findme" className="contact-section" aria-labelledby="contact-title">
          <Image className="contact-sticker" src="/ICONs/2.png" alt="" width={78} height={78} />
          <p className="eyebrow">See you around</p><h2 id="contact-title">Find me in my usual spots.</h2><p>Come say hello, or join me for a game.</p>
          <div className="social-links"><a href="https://www.roblox.com/users/438249299/profile" target="_blank" rel="noopener noreferrer">Roblox</a><a href="https://x.com/ItsSup4756" target="_blank" rel="noopener noreferrer">Twitter / X</a><span>Discord <strong>its_sup</strong></span></div>
          <p className="discord-id">Discord UID: <span>691134554894893116</span></p>
          <div className="footer-signoff"><a className="brand" href="#introduction"><span aria-hidden="true">✿</span> Sup.</a><span>Thanks for stopping by <span aria-hidden="true">♡</span></span><a href="#introduction">Back to top</a></div>
        </footer>
      </main>
    </>
  );
}
