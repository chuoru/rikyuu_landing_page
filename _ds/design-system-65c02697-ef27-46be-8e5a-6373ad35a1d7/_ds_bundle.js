/* @ds-bundle: {"format":3,"namespace":"DesignSystem_65c026","components":[],"sourceHashes":{"ui_kits/website/Contact.jsx":"4e3181e83fd7","ui_kits/website/Footer.jsx":"a464b721e8c8","ui_kits/website/Hero.jsx":"b36467f19a74","ui_kits/website/Navbar.jsx":"6cdc36dc4714","ui_kits/website/Product.jsx":"aeb006dd03f5","ui_kits/website/Services.jsx":"c222260369f3","ui_kits/website/shared.jsx":"fbc5ede2a586"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_65c026 = window.DesignSystem_65c026 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/Contact.jsx
try { (() => {
/* Rikyu Robotics — Contact. Cream section with a giant 縁 watermark, intro copy
   + direct email on the left, an underline-only form on the right that flips to
   a success state on submit. */

function Contact({
  lang
}) {
  const c = RIKYU_COPY.contact[lang];
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    "data-nav-bg": "#F5F0E8",
    className: "rk-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-contact-kanji",
    "aria-hidden": "true"
  }, "縁"), /*#__PURE__*/React.createElement("div", {
    className: "rk-contact-inner"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "rk-label-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rk-tick"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rk-label"
  }, c.sublabel))), /*#__PURE__*/React.createElement("div", {
    className: "rk-contact-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "rk-contact-heading"
  }, c.heading), /*#__PURE__*/React.createElement("span", {
    className: "rk-tick",
    style: {
      marginBottom: 24
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "rk-contact-desc"
  }, c.desc), /*#__PURE__*/React.createElement("div", {
    className: "rk-contact-email"
  }, /*#__PURE__*/React.createElement("p", {
    className: "rk-contact-email-label"
  }, c.emailLabel), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@rikyuu-robotics.com",
    className: "rk-contact-email-link"
  }, "info@rikyuu-robotics.com"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 160
  }, submitted ? /*#__PURE__*/React.createElement("div", {
    className: "rk-contact-success"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rk-tick"
  }), /*#__PURE__*/React.createElement("p", null, c.success)) : /*#__PURE__*/React.createElement("form", {
    className: "rk-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-field"
  }, /*#__PURE__*/React.createElement("label", null, c.name), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: c.namePh
  })), /*#__PURE__*/React.createElement("div", {
    className: "rk-field"
  }, /*#__PURE__*/React.createElement("label", null, c.email), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "taro@example.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "rk-field"
  }, /*#__PURE__*/React.createElement("label", null, c.message), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: 4,
    value: message,
    onChange: e => setMessage(e.target.value),
    placeholder: c.msgPh
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "rk-submit"
  }, c.submit))))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* Rikyu Robotics — Footer. Wordmark, copyright, back-to-top, section links. */

function Footer({
  lang
}) {
  const f = RIKYU_COPY.footer[lang];
  const hrefs = ['#home', '#services', '#contact'];
  return /*#__PURE__*/React.createElement("footer", {
    "data-nav-bg": "#1A3A2A",
    className: "rk-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-footer-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-footer-wm"
  }, /*#__PURE__*/React.createElement("span", null, "利休"), /*#__PURE__*/React.createElement("span", {
    className: "rk-footer-en"
  }, "ROBOTICS")), /*#__PURE__*/React.createElement("p", {
    className: "rk-footer-copy"
  }, f.copy), /*#__PURE__*/React.createElement("a", {
    href: "#home",
    className: "rk-footer-back"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 15l7-7 7 7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), f.top)), /*#__PURE__*/React.createElement("div", {
    className: "rk-footer-links"
  }, f.links.map((item, i) => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: hrefs[i]
  }, item))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Rikyu Robotics — Hero. Dark green stage with scan lines, a faint gold radial
   glow, the giant light slogan (last line gold), a meta row, and the brand's
   chawan (tea bowl) + robot-arm + hishaku line-art on the right. */

function TeaVisual() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "rk-tea",
    viewBox: "-20 0 320 400",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 53 218 Q 48 205 53 192 Q 58 179 53 166",
    stroke: "#F5F0E8",
    strokeWidth: "1.2",
    strokeLinecap: "round",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 70 213 Q 65 200 70 187 Q 75 174 70 161",
    stroke: "#F5F0E8",
    strokeWidth: "1.2",
    strokeLinecap: "round",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 87 218 Q 82 205 87 192 Q 92 179 87 166",
    stroke: "#F5F0E8",
    strokeWidth: "1.2",
    strokeLinecap: "round",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "70",
    cy: "231",
    rx: "48",
    ry: "11",
    fill: "#0F2419",
    fillOpacity: "0.75"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "70",
    cy: "228",
    rx: "52",
    ry: "14",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 18 228 Q 10 268 23 300 Q 37 325 70 331 Q 103 325 117 300 Q 130 268 122 228",
    fill: "#F5F0E8",
    fillOpacity: "0.06",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "70",
    cy: "331",
    rx: "37",
    ry: "9",
    stroke: "#B8962E",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "238",
    y: "8",
    width: "40",
    height: "12",
    rx: "3",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "261",
    y1: "20",
    x2: "261",
    y2: "28",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "255",
    y1: "20",
    x2: "255",
    y2: "28",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "258",
    cy: "36",
    r: "8",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "259",
    y1: "45",
    x2: "241",
    y2: "109",
    stroke: "#B8962E",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "253",
    y1: "43",
    x2: "235",
    y2: "107",
    stroke: "#B8962E",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "236",
    cy: "116",
    r: "8",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "234",
    y1: "125",
    x2: "210",
    y2: "160",
    stroke: "#B8962E",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "229",
    y1: "121",
    x2: "205",
    y2: "156",
    stroke: "#B8962E",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "257",
    y1: "193",
    x2: "128",
    y2: "118",
    stroke: "#B8962E",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "254",
    y1: "199",
    x2: "125",
    y2: "124",
    stroke: "#B8962E",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "202",
    cy: "165",
    r: "8",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "rotate(30, 90, 100)"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "90",
    cy: "86",
    rx: "42",
    ry: "14",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "90",
    cy: "88",
    rx: "36",
    ry: "11",
    stroke: "#B8962E",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "48",
    y1: "86",
    x2: "48",
    y2: "114",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "132",
    y1: "86",
    x2: "132",
    y2: "114",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 132 114 A 42 14 0 0 1 48 114",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  })));
}
function Hero({
  lang
}) {
  const t = RIKYU_COPY.hero[lang];
  return /*#__PURE__*/React.createElement("section", {
    id: "home",
    "data-nav-bg": "#1A3A2A",
    className: "rk-hero"
  }, /*#__PURE__*/React.createElement(ScanLines, null), /*#__PURE__*/React.createElement("div", {
    className: "rk-hero-glow",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(TeaVisual, null), /*#__PURE__*/React.createElement("div", {
    className: "rk-hero-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-slogan"
  }, t.slogan.map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rk-slogan-mask"
  }, /*#__PURE__*/React.createElement("p", {
    className: 'rk-slogan-line' + (i === t.slogan.length - 1 ? ' gold' : ''),
    style: {
      animationDelay: 0.2 + i * 0.12 + 's'
    }
  }, line)))), /*#__PURE__*/React.createElement("div", {
    className: "rk-hero-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rk-tick"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rk-meta-eyebrow"
  }, "Rikyu Robotics"), /*#__PURE__*/React.createElement("a", {
    href: "#product",
    className: "rk-meta-link"
  }, lang === 'ja' ? '製品を見る →' : 'See the Product →')), /*#__PURE__*/React.createElement("p", {
    className: "rk-hero-philo"
  }, t.philosophy)), /*#__PURE__*/React.createElement("div", {
    className: "rk-scroll-ind",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null, "SCROLL"), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 9l-7 7-7-7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Navbar.jsx
try { (() => {
/* Rikyu Robotics — Navbar. Fixed, color-adaptive: lerps its bg to match the
   section behind it (read via [data-nav-bg]). Mobile dropdown + JA/EN toggle. */

function Navbar({
  lang,
  onToggle
}) {
  const GREEN = [26, 58, 42],
    CREAM = [245, 240, 232];
  const [bg, setBg] = React.useState('rgb(26,58,42)');
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const hexToRgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const root = document.querySelector('.rk-app') || document;
    const update = () => {
      const vh = window.innerHeight;
      const sc = root.scrollTop !== undefined ? root.scrollTop : window.scrollY;
      // first viewport: green -> cream transition as hero scrolls away
      if (sc < vh) {
        const t = Math.min(1, sc / vh / 0.7);
        setBg(`rgb(${lerp(GREEN, CREAM, t).join(',')})`);
        return;
      }
      let color = `rgb(${GREEN.join(',')})`;
      root.querySelectorAll('[data-nav-bg]').forEach(el => {
        if (el.getBoundingClientRect().top <= 56) {
          const rgb = hexToRgb(el.dataset.navBg);
          color = `rgb(${rgb.join(',')})`;
        }
      });
      setBg(color);
    };
    const scroller = root.scrollTop !== undefined ? root : window;
    scroller.addEventListener('scroll', update, {
      passive: true
    });
    update();
    return () => scroller.removeEventListener('scroll', update);
  }, []);
  const m = bg.match(/\d+/g).map(Number);
  const dark = (m[0] * 299 + m[1] * 587 + m[2] * 114) / 1000 < 140;
  const ink = dark ? '#F5F0E8' : '#1A3A2A';
  const links = RIKYU_COPY.nav[lang];
  return /*#__PURE__*/React.createElement("nav", {
    className: "rk-nav",
    style: {
      backgroundColor: bg,
      borderColor: dark ? 'rgba(245,240,232,0.10)' : 'rgba(26,58,42,0.10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    className: "rk-brand"
  }, /*#__PURE__*/React.createElement("img", {
    className: "rk-mark",
    src: "../../assets/rikyu_mark.jpeg",
    alt: "Rikyu Robotics"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rk-wm",
    style: {
      color: ink
    }
  }, "利休", /*#__PURE__*/React.createElement("span", {
    className: "rk-wm-en"
  }, "ROBOTICS"))), /*#__PURE__*/React.createElement("div", {
    className: "rk-nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    className: "rk-nav-link",
    style: {
      color: dark ? 'rgba(245,240,232,0.70)' : 'rgba(26,58,42,0.60)'
    }
  }, l.label)), /*#__PURE__*/React.createElement("button", {
    className: "rk-toggle",
    onClick: onToggle
  }, lang === 'ja' ? 'EN' : 'JP')), /*#__PURE__*/React.createElement("div", {
    className: "rk-nav-mobile"
  }, /*#__PURE__*/React.createElement("button", {
    className: "rk-toggle",
    onClick: onToggle
  }, lang === 'ja' ? 'EN' : 'JP'), /*#__PURE__*/React.createElement("button", {
    className: "rk-burger",
    style: {
      color: ink
    },
    onClick: () => setMenuOpen(!menuOpen),
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    viewBox: "0 0 24 24"
  }, menuOpen ? /*#__PURE__*/React.createElement("path", {
    d: "M6 18L18 6M6 6l12 12",
    strokeLinecap: "round"
  }) : /*#__PURE__*/React.createElement("path", {
    d: "M4 6h16M4 12h16M4 18h16",
    strokeLinecap: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: 'rk-nav-dropdown' + (menuOpen ? ' open' : ''),
    style: {
      backgroundColor: bg
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: () => setMenuOpen(false),
    className: "rk-drop-link",
    style: {
      color: dark ? 'rgba(245,240,232,0.80)' : 'rgba(26,58,42,0.80)',
      borderColor: dark ? 'rgba(245,240,232,0.10)' : 'rgba(26,58,42,0.10)'
    }
  }, l.label))));
}
Object.assign(window, {
  Navbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Product.jsx
try { (() => {
/* Rikyu Robotics — Product. 30/70 split: capability list on the left, a
   simulation viewer on the right. The real site embeds a live MuJoCo WebAssembly
   physics sim of the Starrobox dual-arm cell; here it's a cosmetic line-art
   stand-in with a (non-functional) playback bar. */

function SimRobot() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 480 360",
    fill: "none",
    className: "rk-sim-svg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("g", {
    stroke: "rgba(184,150,46,0.18)",
    strokeWidth: "1"
  }, [0, 1, 2, 3, 4, 5, 6].map(i => /*#__PURE__*/React.createElement("line", {
    key: 'h' + i,
    x1: "40",
    y1: 250 + i * 16,
    x2: "440",
    y2: 250 + i * 16
  })), [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => /*#__PURE__*/React.createElement("line", {
    key: 'v' + i,
    x1: 40 + i * 50,
    y1: "250",
    x2: 70 + i * 50,
    y2: "346"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "210",
    y: "232",
    width: "60",
    height: "22",
    stroke: "#B8962E",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#B8962E",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "222",
    cy: "232",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "222",
    y1: "225",
    x2: "170",
    y2: "150"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "166",
    cy: "146",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "170",
    y1: "142",
    x2: "120",
    y2: "120"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "116",
    cy: "118",
    r: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "116",
    y1: "118",
    x2: "92",
    y2: "138"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "116",
    y1: "118",
    x2: "92",
    y2: "100"
  })), /*#__PURE__*/React.createElement("g", {
    stroke: "#D4AF5A",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "258",
    cy: "232",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "258",
    y1: "225",
    x2: "312",
    y2: "158"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "316",
    cy: "154",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "312",
    y1: "150",
    x2: "360",
    y2: "170"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "364",
    cy: "172",
    r: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "364",
    y1: "172",
    x2: "388",
    y2: "156"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "364",
    y1: "172",
    x2: "388",
    y2: "190"
  })), /*#__PURE__*/React.createElement("rect", {
    x: "232",
    y: "196",
    width: "20",
    height: "20",
    stroke: "#F5F0E8",
    strokeOpacity: "0.5",
    strokeWidth: "1.2"
  }));
}
function Product({
  lang
}) {
  const t = RIKYU_COPY.product[lang];
  const [playing, setPlaying] = React.useState(true);
  return /*#__PURE__*/React.createElement("section", {
    id: "product",
    "data-nav-bg": "#1A3A2A",
    className: "rk-product"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "rk-product-panel"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "rk-label-eyebrow"
  }, t.sublabel), /*#__PURE__*/React.createElement("h2", {
    className: "rk-product-name"
  }, t.name), /*#__PURE__*/React.createElement("p", {
    className: "rk-product-sub"
  }, t.subtitle), /*#__PURE__*/React.createElement("span", {
    className: "rk-tick"
  }), /*#__PURE__*/React.createElement("p", {
    className: "rk-product-tagline"
  }, t.tagline)), /*#__PURE__*/React.createElement("div", {
    className: "rk-caps"
  }, t.caps.map(c => /*#__PURE__*/React.createElement("div", {
    key: c[0],
    className: "rk-cap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rk-cap-idx"
  }, c[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "rk-cap-title"
  }, c[1]), /*#__PURE__*/React.createElement("p", {
    className: "rk-cap-desc"
  }, c[2]))))), /*#__PURE__*/React.createElement("p", {
    className: "rk-product-foot"
  }, t.footnote)), /*#__PURE__*/React.createElement("div", {
    className: "rk-sim"
  }, /*#__PURE__*/React.createElement(SimRobot, null), /*#__PURE__*/React.createElement("div", {
    className: "rk-sim-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "rk-sim-btn",
    onClick: () => setPlaying(!playing),
    "aria-label": "Play/pause"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "5",
    width: "4",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "5",
    width: "4",
    height: "14"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 5l12 7-12 7z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rk-sim-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'rk-sim-fill' + (playing ? ' run' : '')
  })), /*#__PURE__*/React.createElement("span", {
    className: "rk-sim-tag"
  }, playing ? 'LIVE' : 'PAUSED'))));
}
Object.assign(window, {
  Product
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Product.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
/* Rikyu Robotics — Services. Three bordered cards on green, each with a gold
   top-tick, a bespoke line icon, bilingual title, and a Coming Soon badge. */

function Services({
  lang
}) {
  const s = RIKYU_COPY.services[lang];
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    className: "rk-services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-services-accent",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rk-services-inner"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "rk-label-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rk-tick"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rk-label"
  }, s.sublabel))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h2", {
    className: "rk-services-heading"
  }, s.heading)), /*#__PURE__*/React.createElement("div", {
    className: "rk-services-grid"
  }, s.items.map((item, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 140
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk-service-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rk-tick",
    style: {
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "rk-service-icon"
  }, RIKYU_ICONS[item.icon]), /*#__PURE__*/React.createElement("h3", {
    className: "rk-service-title"
  }, item.title), /*#__PURE__*/React.createElement("p", {
    className: "rk-service-sub"
  }, item.sub), /*#__PURE__*/React.createElement("p", {
    className: "rk-service-desc"
  }, item.desc), /*#__PURE__*/React.createElement("div", {
    className: "rk-service-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rk-badge"
  }, item.status))))))));
}
Object.assign(window, {
  Services
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/shared.jsx
try { (() => {
/* Rikyu Robotics — shared copy, helpers, and icons for the website UI kit.
   Bilingual (ja / en). Exported to window for cross-script use. */

const RIKYU_COPY = {
  nav: {
    ja: [{
      href: '#product',
      label: '製品'
    }, {
      href: '#services',
      label: '事業'
    }, {
      href: '#contact',
      label: 'お問い合わせ'
    }],
    en: [{
      href: '#product',
      label: 'Product'
    }, {
      href: '#services',
      label: 'Services'
    }, {
      href: '#contact',
      label: 'Contact'
    }]
  },
  hero: {
    ja: {
      slogan: ['本質から、', '未来を', 'つくる。'],
      philosophy: '利休ロボティクスとは、本質的な価値創造を追求する企業である。既成概念にとらわれず体験を再設計し、人と技術が向き合う本質的な時間と空間を創出する。'
    },
    en: {
      slogan: ['Crafting the', 'Future from', 'What Matters.'],
      philosophy: 'Find beauty in imperfection. Discover meaning in simplicity. Rikyu redesigns the experience itself — creating spaces where people and technology truly meet.'
    }
  },
  product: {
    ja: {
      sublabel: '製品',
      name: 'スマートロボックス',
      subtitle: 'ロボットセルシステム',
      tagline: 'シミュレーション・ラボで生まれ、現場で動く。',
      caps: [['01', 'かしこさ', '状況に合わせて動きを変え、自動で最適な作業を選びます'], ['02', '柔軟なデザイン', '用途に応じて構成を変え、さまざまな作業に対応できます'], ['03', '拡張しやすさ', '飲食店から製造ラインまで、規模に合わせて発展させられます'], ['04', '安全性', '人と一緒に使えるように、安全に配慮した設計です'], ['05', 'すぐ使える', '難しい設定なしで、すぐにシステムへ組み込めます'], ['06', 'フィジカルAIへ', 'より賢く動くロボットのための基盤になります']],
      footnote: 'リアルタイム物理デモ'
    },
    en: {
      sublabel: 'PRODUCT',
      name: 'Starrobox',
      subtitle: 'Dual-Arm Robotic System',
      tagline: 'Born in the lab.\nBuilt for the real world.',
      caps: [['01', 'Intelligence', 'Adaptive control with real-time learning and task planning'], ['02', 'Flexibility by Design', 'Modular architecture adapts to diverse manipulation tasks'], ['03', 'Scalability', 'From single-arm research to full dual-arm production deployment'], ['04', 'Safety', 'Force-limited joints and collision detection at every axis'], ['05', 'Plug and Play', 'ROS2-native with zero-config hardware integration'], ['06', 'Toward Physical AI', 'Foundation for embodied intelligence and autonomous manipulation']],
      footnote: 'MuJoCo WebAssembly — real-time physics in browser'
    }
  },
  services: {
    ja: {
      sublabel: 'SERVICES',
      heading: '私たちが\n創る価値',
      items: [{
        title: 'インテリジェント\nロボティクス',
        sub: 'Intelligent Robotics',
        desc: '精密なタスクに対応するAI駆動のロボティクスシステムを開発・提供。製造から医療・農業まで、自動化と知能化を実現します。',
        icon: 'robot',
        status: '準備中'
      }, {
        title: '人間・ロボット\n協調システム',
        sub: 'Human–Robot Collaboration',
        desc: '人間とロボットが自然に協働できる環境を設計。安全性・直感性・効率性を兼ね備えたプラットフォームを構築します。',
        icon: 'collab',
        status: '準備中'
      }, {
        title: 'イノベーション\nコンサルティング',
        sub: 'Innovation Consulting',
        desc: '既存のビジネスモデルを根本から問い直し、技術を通じた本質的な価値創造を実現します。',
        icon: 'consult',
        status: '準備中'
      }]
    },
    en: {
      sublabel: 'WHAT WE BUILD',
      heading: 'Value We\nCreate',
      items: [{
        title: 'Intelligent\nRobotics',
        sub: '知能ロボティクス',
        desc: 'AI-driven robotic systems engineered for precision. From manufacturing to healthcare and agriculture, we bring intelligent automation to industries that matter.',
        icon: 'robot',
        status: 'Coming Soon'
      }, {
        title: 'Human–Robot\nCollaboration',
        sub: '人間・ロボット協調',
        desc: 'Designing environments where humans and robots work naturally side by side. Safe, intuitive, and efficient collaboration platforms.',
        icon: 'collab',
        status: 'Coming Soon'
      }, {
        title: 'Innovation\nConsulting',
        sub: 'イノベーション支援',
        desc: 'Challenging existing paradigms to uncover essential value through technology. Guided by the Rikyu spirit.',
        icon: 'consult',
        status: 'Coming Soon'
      }]
    }
  },
  contact: {
    ja: {
      sublabel: 'お問い合わせ',
      heading: 'ご連絡ください',
      desc: 'ご質問・ご相談・ご提案など、お気軽にお問い合わせください。担当者より折り返しご連絡いたします。',
      name: 'お名前',
      email: 'メールアドレス',
      message: 'メッセージ',
      submit: '送信する',
      success: 'お問い合わせありがとうございます。\n担当者より折り返しご連絡いたします。',
      emailLabel: 'または直接メールにて',
      namePh: '山田 太郎',
      msgPh: 'ご用件をご記入ください...'
    },
    en: {
      sublabel: 'CONTACT',
      heading: 'Get In Touch',
      desc: 'For inquiries, proposals, or any questions — we would love to hear from you. Our team will respond promptly.',
      name: 'Your Name',
      email: 'Email Address',
      message: 'Message',
      submit: 'Send Message',
      success: 'Thank you for reaching out.\nWe will be in touch shortly.',
      emailLabel: 'Or reach us directly',
      namePh: 'Taro Yamada',
      msgPh: 'Please describe your inquiry...'
    }
  },
  footer: {
    ja: {
      links: ['理念', '事業', 'お問い合わせ'],
      copy: '© 2026 株式会社利休 All rights reserved.',
      top: 'トップへ'
    },
    en: {
      links: ['Philosophy', 'Services', 'Contact'],
      copy: '© 2026 Rikyu Co., Ltd. All rights reserved.',
      top: 'TOP'
    }
  }
};

/* The signature 32px gold hairline tick */
function Tick({
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'rk-tick ' + className,
    "aria-hidden": "true"
  });
}

/* Scroll-reveal wrapper — fadeUp on enter (IntersectionObserver) */
function Reveal({
  children,
  delay = 0,
  className = ''
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: 'rk-reveal ' + (shown ? 'rk-in ' : '') + className,
    style: {
      transitionDelay: delay + 'ms'
    }
  }, children);
}

/* Bespoke line icons — match brand: stroke 1.2, round caps, no fill */
const RIKYU_ICONS = {
  robot: /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.2",
    viewBox: "0 0 48 48",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "18",
    width: "20",
    height: "18",
    rx: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "25",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "29",
    cy: "25",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "24",
    y1: "10",
    x2: "24",
    y2: "18"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "8",
    r: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "27",
    x2: "8",
    y2: "27"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "34",
    y1: "27",
    x2: "40",
    y2: "27"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "36",
    x2: "18",
    y2: "42"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "30",
    y1: "36",
    x2: "30",
    y2: "42"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "31",
    x2: "29",
    y2: "31"
  })),
  collab: /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.2",
    viewBox: "0 0 48 48",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "16",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 38c0-6.627 5.373-12 12-12h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 38c0-6.627-5.373-12-12-12h-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 30c0-2.21 1.79-4 4-4s4 1.79 4 4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "24",
    y1: "30",
    x2: "24",
    y2: "38"
  })),
  consult: /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.2",
    viewBox: "0 0 48 48",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "24,6 28,18 42,18 31,26 35,38 24,30 13,38 17,26 6,18 20,18"
  }))
};

/* Logarithmically-spaced scan lines (mirrors Hero.tsx) */
function scanLinePositions() {
  const N = 30,
    BASE = 3.2,
    F = 1.09;
  let y = 0;
  const pos = [];
  for (let i = 0; i < N; i++) {
    y += BASE * Math.pow(F, i);
    pos.push(y);
  }
  return pos.map(p => p / y * 100);
}
const SCAN_LINES = scanLinePositions();
function ScanLines() {
  return /*#__PURE__*/React.createElement("div", {
    className: "rk-scanlines",
    "aria-hidden": "true"
  }, SCAN_LINES.map((pct, i) => /*#__PURE__*/React.createElement("div", {
    key: 'a' + i,
    className: "rk-line",
    style: {
      top: pct + '%',
      background: 'rgba(245,240,232,0.05)'
    }
  })), SCAN_LINES.map((pct, i) => /*#__PURE__*/React.createElement("div", {
    key: 'b' + i,
    className: "rk-line",
    style: {
      top: (pct + 1.6) % 100 + '%',
      background: 'rgba(184,150,46,0.05)'
    }
  })));
}
Object.assign(window, {
  RIKYU_COPY,
  RIKYU_ICONS,
  Tick,
  Reveal,
  ScanLines
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shared.jsx", error: String((e && e.message) || e) }); }

})();
