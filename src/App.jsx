
import React, { useMemo, useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation
} from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Search,
  SlidersHorizontal,
  Heart,
  Gauge,
  Fuel,
  Settings2,
  MapPin,
  CalendarDays,
  Check,
  CarFront,
  Moon,
  Sun,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';

/* ---------------- VEHICLES ---------------- */

const vehicles = [
  {
    id: 1,
    model: 'BMW M4 Competition',
    year: 2024,
    mode: 'sale',
    price: 89500,
    daily: null,
    city: 'Kabul',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '8,500 km',
    seats: 4,
    color: 'Brooklyn Grey',
    tag: 'M PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=88',
    description: 'A focused performance coupe with a sculpted stance, precise response and unmistakable M character.'
  },
  {
    id: 2,
    model: 'BMW M5',
    year: 2023,
    mode: 'sale',
    price: 112000,
    daily: null,
    city: 'Dubai',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '12,000 km',
    seats: 5,
    color: 'Black Sapphire',
    tag: 'EXECUTIVE POWER',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=88',
    description: 'Effortless power meets refined long-distance comfort in this unmistakable performance sedan.'
  },
  {
    id: 3,
    model: 'BMW M3',
    year: 2024,
    mode: 'rent',
    price: null,
    daily: 180,
    city: 'Kabul',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '5,200 km',
    seats: 5,
    color: 'Isle of Man Blue',
    tag: 'AVAILABLE TO RENT',
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=88',
    description: 'A thrilling everyday sports sedan, ready for a special drive or a memorable weekend.'
  },
  {
    id: 4,
    model: 'BMW X5',
    year: 2024,
    mode: 'sale',
    price: 68900,
    daily: null,
    city: 'Herat',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '4,200 km',
    seats: 5,
    color: 'Mineral White',
    tag: 'LUXURY SUV',
    image: 'https://i.pinimg.com/1200x/63/49/de/6349dea022bcad3ab151988fd341f08c.jpg',
    description: 'Confident proportions, generous space and a premium cabin for every kind of journey.'
  },
  {
    id: 5,
    model: 'BMW X7',
    year: 2023,
    mode: 'rent',
    price: null,
    daily: 220,
    city: 'Dubai',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '9,700 km',
    seats: 7,
    color: 'Carbon Black',
    tag: '7-SEAT COMFORT',
    image: 'https://i.pinimg.com/736x/4b/ff/b9/4bffb94e1d70622a06315bf7b629432e.jpg',
    description: 'Flagship presence and spacious comfort for family travel, business and special occasions.'
  },
  {
    id: 6,
    model: 'BMW i4',
    year: 2024,
    mode: 'rent',
    price: null,
    daily: 145,
    city: 'Kabul',
    fuel: 'Electric',
    transmission: 'Automatic',
    mileage: '3,600 km',
    seats: 5,
    color: 'Frozen Pure Grey',
    tag: 'ALL-ELECTRIC',
    image: 'https://i.pinimg.com/736x/d9/8e/a2/d98ea25ae642c332b24bdea4992bcde2.jpg',
    description: 'A quiet, responsive electric grand tourer with the unmistakable spirit of BMW.'
  },
  {
    id: 7,
    model: 'BMW  M8 Competition',
    year: 2024,
    mode: 'sale',
    price: 138000,
    daily: null,
    city: 'Dubai',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '2,800 km',
    seats: 4,
    color: 'Black',
    tag: 'GRAND TOURER',
    image: 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=1400&q=88',
    description: 'A striking grand tourer combining confident performance with elegant design.'
  },
  {
    id: 8,
    model: 'BMW 7 Series',
    year: 2023,
    mode: 'rent',
    price: null,
    daily: 250,
    city: 'Kabul',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    mileage: '6,100 km',
    seats: 5,
    color: 'Mineral White',
    tag: 'LUXURY SEDAN',
    image: 'https://i.pinimg.com/1200x/15/f4/eb/15f4eb5375309e20bfc6f00e22610a60.jpg',
    description: 'Modern luxury, refined comfort and a premium experience for every journey.'
  },
  {
    id: 9,
    model: 'BMW Z4',
    year: 2024,
    mode: 'sale',
    price: 62500,
    daily: null,
    city: 'Herat',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '1,900 km',
    seats: 2,
    color: 'San Francisco Red',
    tag: 'ROADSTER',
    image: 'https://i.pinimg.com/1200x/1e/6e/cb/1e6ecb4d80bd3c8ab2c360293ccdf60c.jpg',
    description: 'A stylish open-top roadster created for a more exciting driving experience.'
  }
];

/* ---------------- TRANSLATIONS ---------------- */

const copy = {
  en: {
    nav: ['Home', 'Collection', 'About', 'Contact'],
    eyebrow: 'THE ART OF DRIVING',
    hero: 'Presence is\nnever accidental.',
    sub: 'A considered collection of BMW automobiles. Discover the drive that feels like yours.',
    explore: 'Explore collection',
    story: 'Discover VENUS',
    collection: 'THE COLLECTION',
    collectionTitle: 'Find your next\nkind of freedom.',
    collectionSub: 'Exceptional BMW automobiles, selected for those who notice every detail.',
    all: 'All vehicles',
    sale: 'For sale',
    rent: 'For rent',
    search: 'Search BMW models...',
    sort: 'Sort by',
    featured: 'FEATURED SELECTION',
    view: 'View details',
    aboutEyebrow: 'A DIFFERENT POINT OF VIEW',
    aboutTitle: 'More than a car.\nA feeling that stays.',
    aboutText: 'VENUS brings together a curated BMW collection for people who value design, confidence and the feeling of the open road. Find your next car to own, or the perfect drive to experience.',
    learn: 'Our philosophy',
    steps: 'THE VENUS WAY',
    stepsTitle: 'A seamless journey,\nfrom first look to first drive.',
    step1: 'Explore',
    step1t: 'Discover a considered selection of BMW models.',
    step2: 'Choose',
    step2t: 'Compare details and find the right match for you.',
    step3: 'Connect',
    step3t: 'Send an inquiry and our team will guide the next step.',
    contact: 'LET’S MAKE IT YOURS',
    contactTitle: 'Your next journey\nstarts with a conversation.',
    contactText: 'Tell us what you have in mind. We’ll help you find the right BMW.',
    contactBtn: 'Get in touch',
    footer: 'The art of driving.',
    rights: '© 2026 VENUS. All rights reserved.',
    salePrice: 'Asking price',
    perDay: '/ day',
    details: 'Vehicle details',
    inquire: 'Make an inquiry',
    close: 'Close',
    name: 'Your name',
    phone: 'Phone or WhatsApp',
    message: 'Your message',
    send: 'Prepare inquiry',
    sample: 'Demonstration listing · Sample pricing',
    noResults: 'No vehicles match your search.',
    location: 'Location',
    fuel: 'Fuel',
    transmission: 'Transmission',
    mileage: 'Mileage',
    seats: 'Seats',
    color: 'Color',
    aboutPage: 'About VENUS',
    aboutPageText: 'VENUS is a BMW-focused automotive experience designed to make discovering, comparing and inquiring about vehicles simple and elegant.',
    contactPage: 'Contact VENUS',
    contactPageText: 'Have a question about a vehicle? Send us a message and tell us what you are looking for.',
    allCars: 'Explore all BMW vehicles',
    back: 'Back to collection',
    saved: 'Saved vehicles',
    noSaved: 'You have not saved any vehicles yet.',
    success: 'Your email draft is ready.',
    themeLight: 'Light mode',
    themeDark: 'Dark mode'
  },
  fa: {
    nav: ['خانه', 'مجموعه موترها', 'درباره ما', 'تماس'],
    eyebrow: 'هنر رانندگی',
    hero: 'حضور،\nاتفاقی نیست.',
    sub: 'مجموعه‌ای منتخب از موترهای BMW؛ تجربه‌ای برای کسانی که به جزئیات اهمیت می‌دهند.',
    explore: 'دیدن مجموعه',
    story: 'آشنایی با ونوس',
    collection: 'مجموعه موترها',
    collectionTitle: 'آزادی بعدی خود را\nپیدا کنید.',
    collectionSub: 'موترهای ویژه BMW، برای کسانی که هر جزئیات را می‌بینند.',
    all: 'همه موترها',
    sale: 'فروش',
    rent: 'کرایه',
    search: 'جستجوی مدل BMW...',
    sort: 'ترتیب',
    featured: 'انتخاب ویژه',
    view: 'جزئیات بیشتر',
    aboutEyebrow: 'نگاهی متفاوت',
    aboutTitle: 'بیشتر از یک موتر؛\nحسی که می‌ماند.',
    aboutText: 'ونوس مجموعه‌ای منتخب از موترهای BMW را برای کسانی گردهم می‌آورد که طراحی، اعتماد و لذت جاده را ارزشمند می‌دانند. موتر دلخواه‌تان را بخرید یا رانندگی متفاوتی را تجربه کنید.',
    learn: 'فلسفه ما',
    steps: 'روش ونوس',
    stepsTitle: 'یک مسیر ساده،\nاز انتخاب تا رانندگی.',
    step1: 'جستجو',
    step1t: 'مدل‌های منتخب BMW را ببینید.',
    step2: 'انتخاب',
    step2t: 'جزئیات را مقایسه و انتخاب مناسب را پیدا کنید.',
    step3: 'ارتباط',
    step3t: 'درخواست خود را بفرستید تا راهنمایی‌تان کنیم.',
    contact: 'بیایید انتخابش کنیم',
    contactTitle: 'سفر بعدی شما\nبا یک گفتگو آغاز می‌شود.',
    contactText: 'از انتخاب خود برای ما بگویید؛ در یافتن BMW مناسب کمک‌تان می‌کنیم.',
    contactBtn: 'تماس با ما',
    footer: 'هنر رانندگی.',
    rights: '© ۲۰۲۶ ونوس. تمامی حقوق محفوظ است.',
    salePrice: 'قیمت فروش',
    perDay: ' / روز',
    details: 'جزئیات موتر',
    inquire: 'درخواست معلومات',
    close: 'بستن',
    name: 'نام شما',
    phone: 'شماره تماس یا واتساپ',
    message: 'پیام شما',
    send: 'آماده‌سازی درخواست',
    sample: 'آگهی نمایشی · قیمت نمونه',
    noResults: 'موتر مطابق جستجوی شما پیدا نشد.',
    location: 'موقعیت',
    fuel: 'سوخت',
    transmission: 'گیربکس',
    mileage: 'کارکرد',
    seats: 'سرنشین',
    color: 'رنگ',
    aboutPage: 'درباره ونوس',
    aboutPageText: 'ونوس یک تجربه ویژه برای موترهای BMW است که جستجو، مقایسه و درخواست معلومات درباره موترها را ساده و زیبا می‌سازد.',
    contactPage: 'تماس با ونوس',
    contactPageText: 'درباره یک موتر سوال دارید؟ پیام خود را بفرستید و بگویید دنبال چه چیزی هستید.',
    allCars: 'دیدن تمام موترهای BMW',
    back: 'بازگشت به مجموعه',
    saved: 'موترهای مورد علاقه',
    noSaved: 'هنوز هیچ موتری را ذخیره نکرده‌اید.',
    success: 'پیش‌نویس ایمیل شما آماده است.',
    themeLight: 'حالت روشن',
    themeDark: 'حالت تاریک'
  }
};

const money = n => '$' + Number(n).toLocaleString('en-US');

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

/* ---------------- SHARED NAVBAR ---------------- */

function Navbar({ lang, setLang, theme, setTheme, t }) {
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <motion.header
      className="nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Link className="brand" to="/">
        <span className="brand-mark">V</span>
        <span>
          VENUS
          <small>BMW COLLECTION</small>
        </span>
      </Link>

      <nav className={menu ? 'nav-links open' : 'nav-links'}>
        <Link to="/">{t.nav[0]}</Link>
        <Link to="/collection">{t.nav[1]}</Link>
        <Link to="/about">{t.nav[2]}</Link>
        <Link to="/contact">{t.nav[3]}</Link>
      </nav>

      <div className="nav-actions">
        <button
          className="lang"
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
        >
          {lang === 'en' ? 'دری' : 'EN'}
          <ChevronDown size={13} />
        </button>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          title={theme === 'dark' ? t.themeLight : t.themeDark}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <Link className="nav-cta" to="/collection">
          {t.explore}
          <ArrowUpRight size={15} />
        </Link>

        <button
          className="menu-btn"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle navigation"
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>
  );
}

/* ---------------- VEHICLE CARD ---------------- */

function VehicleCard({ vehicle, saved, toggleSaved, t }) {
  const navigate = useNavigate();

  return (
    <motion.article
      className="vehicle-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="vehicle-image"
        onClick={() => navigate(`/vehicle/${vehicle.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter') navigate(`/vehicle/${vehicle.id}`);
        }}
      >
        <img src={vehicle.image} alt={vehicle.model} loading="lazy" />
        <div className="image-shade" />
        <span className="vehicle-tag">{vehicle.tag}</span>

        <button
          className={saved ? 'save saved' : 'save'}
          onClick={e => {
            e.stopPropagation();
            toggleSaved(vehicle.id);
          }}
          aria-label="Save vehicle"
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>

        <span className="image-index">
          {String(vehicle.id).padStart(2, '0')}
        </span>
      </div>

      <div className="vehicle-info">
        <div className="vehicle-top">
          <span>{vehicle.year} <b>·</b> {vehicle.city}</span>
          <span className="condition">
            {vehicle.mode === 'sale' ? 'FOR SALE' : 'FOR RENT'}
          </span>
        </div>

        <h3>{vehicle.model}</h3>

        <div className="spec-row">
          <span><Gauge size={14} />{vehicle.mileage}</span>
          <span><Fuel size={14} />{vehicle.fuel}</span>
          <span><Settings2 size={14} />{vehicle.transmission}</span>
        </div>

        <div className="vehicle-bottom">
          <div className="price">
            <small>
              {vehicle.mode === 'sale' ? t.salePrice : 'FROM'}
            </small>
            <strong>
              {money(vehicle.mode === 'sale' ? vehicle.price : vehicle.daily)}
              {vehicle.mode === 'rent' && <em>{t.perDay}</em>}
            </strong>
          </div>

          <button
            className="round-arrow"
            onClick={() => navigate(`/vehicle/${vehicle.id}`)}
            aria-label={`${t.view}: ${vehicle.model}`}
          >
            <ArrowUpRight size={19} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- VEHICLE GRID ---------------- */

function VehicleGrid({ items, saved, toggleSaved, t }) {
  return (
    <div className="vehicle-grid">
      {items.map(vehicle => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          saved={saved.includes(vehicle.id)}
          toggleSaved={toggleSaved}
          t={t}
        />
      ))}
    </div>
  );
}

/* ---------------- HOME PAGE ---------------- */

function Home({ t, saved, toggleSaved }) {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-backdrop" />
        <div className="hero-grid" />

        <div className="hero-content">
          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            className="hero-copy"
          >
            <div className="eyebrow">
              <span />
              {t.eyebrow}
            </div>

            <h1>
              {t.hero.split('\n').map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </h1>

            <p>{t.sub}</p>

            <div className="hero-buttons">
              <Link className="button button-light" to="/collection">
                {t.explore}
                <ArrowUpRight size={17} />
              </Link>

              <Link className="text-link" to="/about">
                {t.story}
                <span>↗</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <span>01 / 09</span>
            <i />
            <span>BMW · THE COLLECTION</span>
          </motion.div>

          <div className="hero-vertical">VENUS AUTOMOTIVE EXPERIENCE</div>
        </div>
      </section>

      <section className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              PRECISION <b>✦</b> PRESENCE <b>✦</b>
              PERFORMANCE <b>✦</b> BMW COLLECTION <b>✦</b>
            </span>
          ))}
        </div>
      </section>

      <section className="collection section">
        <motion.div
          className="section-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
        >
          <div>
            <div className="eyebrow dark">
              <span />
              {t.featured}
            </div>
            <h2>{t.collectionTitle}</h2>
          </div>
          <p>{t.collectionSub}</p>
        </motion.div>

        <VehicleGrid
          items={vehicles.slice(0, 3)}
          saved={saved}
          toggleSaved={toggleSaved}
          t={t}
        />

        <div className="home-more">
          <Link className="button button-dark" to="/collection">
            {t.allCars}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <Experience t={t} />
      <Steps t={t} />

      <section className="contact">
        <div className="contact-orb" />
        <div className="eyebrow">
          <span />
          {t.contact}
        </div>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <Link className="button button-light" to="/contact">
          {t.contactBtn}
          <ArrowUpRight size={17} />
        </Link>
        <span className="contact-watermark">VENUS</span>
      </section>
    </main>
  );
}

/* ---------------- COLLECTION PAGE ---------------- */

function Collection({ t, saved, toggleSaved }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [showSaved, setShowSaved] = useState(false);

  const filtered = useMemo(() => {
    let result = vehicles.filter(vehicle => {
      const matchesFilter = filter === 'all' || vehicle.mode === filter;
      const matchesSearch = vehicle.model.toLowerCase().includes(query.toLowerCase());
      const matchesSaved = !showSaved || saved.includes(vehicle.id);

      return matchesFilter && matchesSearch && matchesSaved;
    });

    if (sort === 'low') {
      result.sort((a, b) => (a.price ?? a.daily) - (b.price ?? b.daily));
    } else if (sort === 'high') {
      result.sort((a, b) => (b.price ?? b.daily) - (a.price ?? a.daily));
    }

    return result;
  }, [filter, query, sort, showSaved, saved]);

  return (
    <main className="inner-page">
      <section className="page-banner">
        <div className="eyebrow"><span />{t.collection}</div>
        <h1>{t.collectionTitle}</h1>
        <p>{t.collectionSub}</p>
      </section>

      <section className="collection section">
        <div className="toolbar">
          <div className="filters">
            {[
              ['all', t.all],
              ['sale', t.sale],
              ['rent', t.rent]
            ].map(([id, label]) => (
              <button
                key={id}
                className={filter === id ? 'filter active' : 'filter'}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}

            <button
              className={showSaved ? 'filter active' : 'filter'}
              onClick={() => setShowSaved(!showSaved)}
            >
              <Heart size={13} />
              {t.saved} ({saved.length})
            </button>
          </div>

          <div className="tools">
            <label className="search">
              <Search size={16} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t.search}
              />
            </label>

            <label className="sort">
              <SlidersHorizontal size={15} />
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">{t.sort}: Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
              </select>
            </label>
          </div>
        </div>

        <VehicleGrid
          items={filtered}
          saved={saved}
          toggleSaved={toggleSaved}
          t={t}
        />

        {filtered.length === 0 && (
          <div className="empty">
            {showSaved && saved.length === 0 ? t.noSaved : t.noResults}
          </div>
        )}

        <p className="demo-note">* {t.sample}</p>
      </section>
    </main>
  );
}

/* ---------------- VEHICLE DETAILS PAGE ---------------- */

function VehicleDetails({ t, saved, toggleSaved }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find(item => item.id === Number(id));

  if (!vehicle) {
    return (
      <main className="inner-page">
        <section className="page-banner">
          <h1>Vehicle not found</h1>
          <Link className="button button-dark" to="/collection">
            {t.back}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="inner-page">
      <section className="details-page">
        <button className="back-link" onClick={() => navigate('/collection')}>
          <ArrowRight size={16} />
          {t.back}
        </button>

        <motion.div
          className="details-layout"
          initial="hidden"
          animate="show"
          variants={reveal}
        >
          <div className="details-photo">
            <img src={vehicle.image} alt={vehicle.model} />
            <span className="vehicle-tag">{vehicle.tag}</span>
          </div>

          <div className="details-content">
            <div className="eyebrow dark"><span />{t.details}</div>
            <h1>{vehicle.model}</h1>
            <p>{vehicle.description}</p>

            <div className="details-price">
              {money(vehicle.mode === 'sale' ? vehicle.price : vehicle.daily)}
              {vehicle.mode === 'rent' && <small>{t.perDay}</small>}
            </div>

            <div className="detail-grid">
              {[
                [t.location, vehicle.city],
                [t.fuel, vehicle.fuel],
                [t.transmission, vehicle.transmission],
                [t.mileage, vehicle.mileage],
                [t.seats, vehicle.seats],
                [t.color, vehicle.color]
              ].map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="details-actions">
              <Link className="button button-dark" to="/contact">
                {t.inquire}
                <ArrowUpRight size={17} />
              </Link>

              <button
                className={saved.includes(vehicle.id) ? 'button save-detail active' : 'button save-detail'}
                onClick={() => toggleSaved(vehicle.id)}
              >
                <Heart
                  size={17}
                  fill={saved.includes(vehicle.id) ? 'currentColor' : 'none'}
                />
                {t.saved}
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* ---------------- EXPERIENCE SECTION ---------------- */

function Experience({ t }) {
  return (
    <section className="experience" id="experience">
      <div className="experience-image">
        <img
          src="https://i.pinimg.com/736x/d4/39/a0/d439a0096af12c5aaf113788924cb18b.jpg"
          alt="BMW performance car"
          loading="lazy"
        />
        <div className="experience-overlay" />
        <div className="experience-number">02 <span>— 04</span></div>
      </div>

      <div className="experience-copy">
        <div className="eyebrow">
          <span />
          {t.aboutEyebrow}
        </div>
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutText}</p>
        <Link className="text-link light-link" to="/about">
          {t.learn}
          <ArrowUpRight size={16} />
        </Link>
        <div className="metal-line" />
        <div className="experience-stat">
          <strong>01</strong>
          <span>CURATED BMW COLLECTION</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT STEPS ---------------- */

function Steps({ t }) {
  const steps = [
    [t.step1, t.step1t, '01'],
    [t.step2, t.step2t, '02'],
    [t.step3, t.step3t, '03']
  ];

  return (
    <section className="about section">
      <div className="about-top">
        <div>
          <div className="eyebrow dark"><span />{t.steps}</div>
          <h2>{t.stepsTitle}</h2>
        </div>
        <div className="about-symbol">V<span>✦</span></div>
      </div>

      <div className="steps-grid">
        {steps.map(([title, description, number]) => (
          <motion.div
            className="step"
            key={number}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={reveal}
          >
            <span className="step-num">{number}</span>
            <div className="step-icon"><CarFront size={23} /></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <ArrowUpRight className="step-arrow" size={18} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ABOUT PAGE ---------------- */

function About({ t }) {
  return (
    <main className="inner-page">
      <section className="page-banner">
        <div className="eyebrow"><span />{t.aboutEyebrow}</div>
        <h1>{t.aboutPage}</h1>
        <p>{t.aboutPageText}</p>
      </section>

      <Experience t={t} />
      <Steps t={t} />

      <section className="about-extra section">
        <div className="eyebrow dark"><span />VENUS VALUES</div>
        <h2>Precision. Presence. Performance.</h2>
        <p>{t.aboutText}</p>
        <Link className="button button-dark" to="/collection">
          {t.allCars}
          <ArrowUpRight size={17} />
        </Link>
      </section>
    </main>
  );
}

/* ---------------- CONTACT PAGE ---------------- */

function Contact({ t }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent('VENUS vehicle inquiry');
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\n` +
      `Phone: ${data.get('phone')}\n` +
      `Message: ${data.get('message')}`
    );

    setSent(true);
    window.location.href =
      `mailto:contact@venus-auto.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="inner-page">
      <section className="page-banner">
        <div className="eyebrow"><span />{t.contact}</div>
        <h1>{t.contactPage}</h1>
        <p>{t.contactPageText}</p>
      </section>

      <section className="contact-page section">
        <div className="contact-info">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>

          <div className="contact-detail">
            <Mail size={18} />
            <span>contact@venus-auto.com</span>
          </div>
          <div className="contact-detail">
            <MapPin size={18} />
            <span>Kabul, Afghanistan</span>
          </div>

          <p className="form-note">
            Email and location above are demonstration details. Replace them
            with your real business information before publishing.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            {t.name}
            <input name="name" required />
          </label>

          <label>
            {t.phone}
            <input name="phone" required />
          </label>

          <label>
            {t.message}
            <textarea name="message" rows="5" required />
          </label>

          <button className="button button-dark" type="submit">
            {t.send}
            <ArrowUpRight size={17} />
          </button>

          {sent && <p className="form-note">{t.success}</p>}
        </form>
      </section>
    </main>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer({ t }) {
  return (
    <footer className="footer">
      <Link className="brand" to="/">
        <span className="brand-mark">V</span>
        <span>
          VENUS
          <small>BMW COLLECTION</small>
        </span>
      </Link>

      <p>{t.footer}</p>

      <div className="footer-right">
        <Link to="/collection">{t.nav[1]}</Link>
        <Link to="/about">{t.nav[2]}</Link>
        <Link to="/contact">{t.nav[3]}</Link>
      </div>

      <div className="copyright">
        {t.rights}
        <span>CRAFTED FOR THE DRIVE ✦</span>
      </div>
    </footer>
  );
}

/* ---------------- MAIN APP ---------------- */

function AppContent() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [saved, setSaved] = useState([]);

  const t = copy[lang];
  const rtl = lang === 'fa';

  const toggleSaved = id => {
    setSaved(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [lang, rtl]);

  return (
    <div
      className={`app ${rtl ? 'rtl' : ''} ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}
      dir={rtl ? 'rtl' : 'ltr'}
      data-theme={theme}
    >
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              t={t}
              saved={saved}
              toggleSaved={toggleSaved}
            />
          }
        />

        <Route
          path="/collection"
          element={
            <Collection
              t={t}
              saved={saved}
              toggleSaved={toggleSaved}
            />
          }
        />

        <Route
          path="/vehicle/:id"
          element={
            <VehicleDetails
              t={t}
              saved={saved}
              toggleSaved={toggleSaved}
            />
          }
        />

        <Route path="/about" element={<About t={t} />} />
        <Route path="/contact" element={<Contact t={t} />} />

        <Route path="*" element={<Home t={t} saved={saved} toggleSaved={toggleSaved} />} />
      </Routes>

      <Footer t={t} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/VENUS-BMW-react">
      <AppContent />
    </BrowserRouter>
  );
}
