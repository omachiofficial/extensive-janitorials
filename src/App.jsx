import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, CheckCircle2, 
  Briefcase, Droplets, SprayCan as Spray, 
  Wind, ShoppingBag, Sofa, 
  ChevronRight, Moon, Sun, Star, ArrowRight
} from 'lucide-react';

// Company Data
const companyInfo = {
  name: 'Extensive Janitorial Services Limited',
  address: 'H3, Shared Office, Novare Gateway Mall, Lugbe Abuja',
  email: 'extensivejanitorialservicesltd@gmail.com',
  phone: '08022969807',
  mdPhone: '08083316586',
  rcNumber: '1987912',
  whatsapp: '2348022969807',
  motto: 'Your satisfaction, our priority'
};

// Hero background slideshow. Drop four images in your public folder with these
// names, or rename the entries here to match your own files.
const heroImages = ['hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg', 'hero-4.jpg'];

// Turns a local Nigerian number (08022969807) into a dialable international
// href (+2348022969807) while the visible label stays in the local format.
const telHref = (num) => {
  const digits = String(num || '').replace(/\D/g, '');
  return digits.startsWith('0') ? `+234${digits.slice(1)}` : `+${digits}`;
};

const servicesList = [
  { id: 1, title: 'Cleaning Services', icon: Droplets, image: 'service-cleaning.jpg', description: 'Comprehensive general cleaning for offices, malls, and homes.' },
  { id: 2, title: 'Post Construction Cleaning', icon: Briefcase, image: 'service-post-construction.jpg', description: 'Detailed cleanup for newly built or renovated sites.' },
  { id: 3, title: 'Fumigation', icon: Spray, image: 'service-fumigation.jpg', description: 'Indoor and outdoor pest control and fumigation exercises.' },
  { id: 4, title: 'Derating', icon: Wind, image: 'service-derating.jpg', description: 'Professional rodent control and elimination services.' },
  { id: 7, title: 'Upholstery Cleaning', icon: Sofa, image: 'service-upholstery.jpg', description: 'Deep cleaning for sofas, carpets, and other upholstery.' }
];

const specializedAreas = [
  "Shopping centers/Mall cleaning", "Industrial Cleaning", "Offices", 
  "Healthcare facility", "Construction cleaning service", 
  "Home cleaning service", "Learning institutions"
];

const floorMaintenance = [
  "Natural stones (Marble, Granite)", "Ceramic tiles & concrete",
  "Stripping and Sealing of floors", "Water extraction after flooding",
  "Deep Cleaning - Ablutions/Kitchen", "Window Cleaning"
];

const clients = [
  { id: 'irecharge', name: 'i-Recharge' },
  { id: 'novare-central', name: 'Novare Central' },
  { id: 'novare-gateway', name: 'Novare Gateway' },
  { id: 'novare-apo', name: 'Novare Apo' },
  { id: 'builditect', name: 'Builditect Design' },
  { id: '2tshie', name: '2Tshie' },
  { id: 'spar', name: 'Spar (Novare Central)' },
  { id: 'fmc', name: 'Federal Medical Centre Keffi' },
  { id: 'maypass', name: 'Maypass Co-Work Space' },
  { id: 'nova', name: 'Nova Cinema' },
  { id: 'ivr', name: 'IVR Arcade (Apo)' },
  { id: 'hellotractor', name: 'Hello Tractor' },
  { id: 'funworld', name: 'Funworld (Novare Gateway)' },
  { id: 'lounge', name: 'Lounge Network' },
  { id: 'kanohouse', name: 'Kano House' },
  { id: 'azura', name: 'Azura Power' },
  { id: 'springhurst', name: 'Springhurst Ltd' }
];

// Reusable Component for Scroll Reveal Animations
const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Fail open: if the visitor prefers reduced motion, or the browser has no
    // IntersectionObserver, show the content immediately rather than leaving it at opacity-0.
    const prefersReduced = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = window.localStorage.getItem('ejs-theme-v2');
      if (saved === 'dark' || saved === 'light') return saved === 'dark';
    } catch (err) {
      // localStorage can throw in private mode or when cookies are blocked
    }
    // First-time visitors always start on the light theme, regardless of their
    // OS setting. Their choice is remembered from the moment they toggle.
    return false;
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteType, setQuoteType] = useState('service');
  
  // Smart Scroll Carousel State
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);
  const scrollPos = useRef(0);

  // Hero slideshow
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || heroImages.length < 2) return;

    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  
  const [quoteForm, setQuoteForm] = useState({
    fullName: '', email: '', phone: '', company: '', serviceType: '', propertyType: '', sqFt: '', frequency: '', details: ''
  });

  const [supplyForm, setSupplyForm] = useState({
    fullName: '', email: '', phone: '', company: '', address: '', items: '', quantity: '', details: ''
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('ejs-theme-v2', darkMode ? 'dark' : 'light');
    } catch (err) {
      // ignore write failures; the theme still applies for this session
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  // Smart Scroll Logic for the Clients Carousel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId;
    
    const scroll = () => {
      // Only wrap once the duplicated track is actually wider than the viewport.
      // Before the logo images load, scrollWidth is tiny and scrollLeft sits at 0,
      // which would otherwise trigger the backwards wrap and cause a jump on load.
      const loopReady = el.scrollWidth > el.clientWidth + 100;

      // 1. If not swiping/hovering, auto-advance the scroll position
      if (!isHovered) {
        scrollPos.current += 0.75; 
        el.scrollLeft = scrollPos.current;
      } else {
        // 2. If user is swiping, sync our memory to where they swiped
        scrollPos.current = el.scrollLeft;
      }
      
      // 3. Seamless looping magic
      if (loopReady) {
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
          scrollPos.current = 0;
        } else if (isHovered && el.scrollLeft <= 0) {
          // Backwards wrap only matters while the user is dragging
          el.scrollLeft = el.scrollWidth / 2;
          scrollPos.current = el.scrollWidth / 2;
        }
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleQuoteChange = (e) => setQuoteForm(prev => ({...prev, [e.target.name]: e.target.value}));
  const handleSupplyChange = (e) => setSupplyForm(prev => ({...prev, [e.target.name]: e.target.value}));

  // Values are URL-encoded individually so that characters like & and # in a name
  // or address don't truncate the WhatsApp message. %0A line breaks stay literal.
  const enc = (v) => encodeURIComponent(v || '');

  const submitQuote = (e) => {
    e.preventDefault();
    const msg = `*New Service Quote Request*%0A%0A*Name:* ${enc(quoteForm.fullName)}%0A*Email:* ${enc(quoteForm.email)}%0A*Phone:* ${enc(quoteForm.phone)}%0A*Company:* ${enc(quoteForm.company)}%0A*Service:* ${enc(quoteForm.serviceType)}%0A*Property:* ${enc(quoteForm.propertyType)}%0A*Size:* ${enc(quoteForm.sqFt)}%0A*Frequency:* ${enc(quoteForm.frequency)}%0A*Details:* ${enc(quoteForm.details)}`;
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${msg}`, '_blank');
    setIsQuoteOpen(false);
    setQuoteForm({ fullName: '', email: '', phone: '', company: '', serviceType: '', propertyType: '', sqFt: '', frequency: '', details: '' });
  };

  const submitSupply = (e) => {
    e.preventDefault();
    const msg = `*New Supply Order Request*%0A%0A*Name:* ${enc(supplyForm.fullName)}%0A*Email:* ${enc(supplyForm.email)}%0A*Phone:* ${enc(supplyForm.phone)}%0A*Company:* ${enc(supplyForm.company)}%0A*Delivery Address:* ${enc(supplyForm.address)}%0A*Items Interested In:* ${enc(supplyForm.items)}%0A*Estimated Quantity:* ${enc(supplyForm.quantity)}%0A*Additional Details:* ${enc(supplyForm.details)}`;
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${msg}`, '_blank');
    setIsQuoteOpen(false);
    setSupplyForm({ fullName: '', email: '', phone: '', company: '', address: '', items: '', quantity: '', details: '' });
  };

  const sectionClass = `py-16 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ease-in-out ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-gray-900'}`;
  const sectionAltClass = `py-16 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ease-in-out ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ease-in-out ${darkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .stagger-1 { animation-delay: 100ms; } .stagger-2 { animation-delay: 200ms; } .stagger-3 { animation-delay: 300ms; }
        .glass-nav { background: ${darkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(248, 250, 252, 0.85)'}; backdrop-filter: blur(12px); border-bottom: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .animate-fade-in-up, .reveal {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}} />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 glass-nav`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-110">
                 <img src="logo.png" alt="Extensive Janitorial Logo" className="w-full h-full object-contain" onError={(e) => { e.target.style.display='none'; e.target.nextElementSibling.style.display='flex'; }} />
                 <span style={{display: 'none'}} className="text-[#175EAC] dark:text-[#FFEF03] font-bold text-xl">EJ</span>
              </div>
              <div className="overflow-hidden">
                <div className={`font-extrabold text-base leading-tight truncate transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Extensive Janitorial</div>
                <p className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]'}`}>Services Ltd</p>
              </div>
            </div>

            {/* Right Side Navigation & Actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="hidden md:flex items-center gap-6 mr-2 lg:mr-4">
                <button onClick={() => navigateTo('home')} className={`relative font-medium text-sm transition-colors group ${currentPage === 'home' ? (darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]') : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900')}`}>
                  Home
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${darkMode ? 'bg-[#FFEF03]' : 'bg-[#175EAC]'} ${currentPage === 'home' ? 'w-full' : 'w-0'}`}></span>
                </button>
                <button onClick={() => navigateTo('supplies')} className={`relative font-medium text-sm transition-colors group ${currentPage === 'supplies' ? (darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]') : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900')}`}>
                  Cleaning Supplies
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${darkMode ? 'bg-[#FFEF03]' : 'bg-[#175EAC]'} ${currentPage === 'supplies' ? 'w-full' : 'w-0'}`}></span>
                </button>
                <button onClick={() => navigateTo('equipment')} className={`relative font-medium text-sm transition-colors group ${currentPage === 'equipment' ? (darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]') : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900')}`}>
                  Equipment Renting
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${darkMode ? 'bg-[#FFEF03]' : 'bg-[#175EAC]'} ${currentPage === 'equipment' ? 'w-full' : 'w-0'}`}></span>
                </button>
              </div>

              <button 
                onClick={() => { setQuoteType('service'); setIsQuoteOpen(true); }}
                className={`hidden sm:flex px-5 py-2 rounded-full font-bold text-sm transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-lg items-center gap-2 ${darkMode ? 'bg-[#FFEF03] text-slate-900 hover:bg-yellow-400' : 'bg-[#174622] text-white hover:bg-[#113318]'}`}
              >
                Request Quote
              </button>

              <button onClick={toggleMenu} className={`md:hidden p-2 rounded-full transition-colors ${darkMode ? 'text-white hover:bg-slate-800' : 'text-gray-900 hover:bg-gray-100'}`}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Context Menu */}
        <div className={`absolute top-full right-4 mt-2 w-56 rounded-xl shadow-2xl transition-all duration-300 ease-out origin-top-right overflow-hidden ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-2 pointer-events-none'} ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
          <div className="py-2">
            <button onClick={() => navigateTo('home')} className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${darkMode ? 'text-gray-200 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'}`}>Home</button>
            <button onClick={() => navigateTo('supplies')} className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${darkMode ? 'text-gray-200 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'}`}>Cleaning Supplies</button>
            <button onClick={() => navigateTo('equipment')} className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${darkMode ? 'text-gray-200 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'}`}>Equipment Renting (Soon)</button>
            <div className={`h-px my-1 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
            <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${darkMode ? 'text-[#FFEF03] hover:bg-slate-700' : 'text-[#175EAC] hover:bg-gray-50'}`}>
              24/7 Contact via WhatsApp
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        
        {/* === HOME PAGE === */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className={`relative flex items-center min-h-[85vh] sm:block sm:min-h-0 pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-36 lg:pb-40 overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>

              {/* Background slideshow, masked so the lower half dissolves into the
                  page instead of ending on a hard edge. Light mode carries the photos
                  more strongly than dark mode. */}
              <div
                className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                style={{
                  opacity: 0.5,
                  maskImage: 'linear-gradient(to bottom, #000 0%, #000 30%, rgba(0,0,0,0.35) 58%, transparent 88%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 30%, rgba(0,0,0,0.35) 58%, transparent 88%)'
                }}
                aria-hidden="true"
              >
                {heroImages.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover object-center scale-105 sm:scale-110 transition-opacity ease-in-out ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transitionDuration: '1500ms',
                      // Frosted-glass treatment. Raise the blur value for more frost,
                      // lower it for a sharper photo. scale-110 above hides the soft
                      // edges that blur leaves around the image border.
                      filter: 'blur(2.5px) saturate(1.15) brightness(0.85)'
                    }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ))}

                {/* Milky layer that completes the glass look */}
                <div className={`absolute inset-0 ${darkMode ? 'bg-slate-900/25' : 'bg-transparent'}`}></div>
              </div>

              <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-1.5 mb-6 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm animate-fade-in-up opacity-0">
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <p className={`text-[11px] font-semibold tracking-wide transition-colors ${darkMode ? 'text-green-400' : 'text-green-700'}`}>Licensed and Insured Professional Cleaning Service</p>
                </div>
                
                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 transition-colors duration-700 ${darkMode ? 'text-white' : 'text-slate-900'} animate-fade-in-up stagger-1 opacity-0`}>
                  Impeccable Cleaning
                  <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-[#FFEF03] via-[#FDE047] to-[#F59E0B]' : 'from-[#175EAC] via-[#2563EB] to-[#0EA5E9]'}`}>
                    Unmatched Professionalism
                  </span>
                </h1>
                
                <p className={`max-w-2xl mx-auto text-lg md:text-xl mb-10 transition-colors duration-700 ${darkMode ? 'text-gray-300' : 'text-gray-600'} animate-fade-in-up stagger-2 opacity-0`}>
                  We specialize in providing top-tier janitorial services, post-construction cleaning, fumigation, and hygiene solutions across Nigeria
                </p>
                
                <div className="flex flex-row justify-center items-stretch gap-3 sm:gap-4 animate-fade-in-up stagger-3 opacity-0">
                  <button 
                    onClick={() => { setQuoteType('service'); setIsQuoteOpen(true); }}
                    className={`px-5 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-lg whitespace-nowrap transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group ${darkMode ? 'bg-[#FFEF03] text-slate-900 shadow-[0_0_20px_rgba(255,239,3,0.3)] hover:bg-yellow-400' : 'bg-[#175EAC] text-white shadow-[0_0_20px_rgba(23,94,172,0.3)] hover:bg-[#124b89]'}`}
                  >
                    Request a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a 
                    href="#services"
                    className={`px-5 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-lg whitespace-nowrap transition-all border-2 flex items-center justify-center hover:-translate-y-1 active:scale-95 ${darkMode ? 'border-slate-700 text-gray-300 hover:bg-slate-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Explore Services
                  </a>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className={sectionAltClass}>
              <RevealOnScroll>
                <div className="max-w-7xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className={`font-bold tracking-wider uppercase text-sm mb-2 ${darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]'}`}>Company Profile</h2>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Dedicated to maintaining exceptional environments</h3>
                      
                      <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Registered in Nigeria with the Corporate Affairs Commission, Extensive Janitorial Services Limited is committed to adhering to all government legislations including Minimum Wage, Social Security, and Tax Deductions
                      </p>
                      
                      <div className={`p-6 rounded-2xl border-l-4 transition-colors ${darkMode ? 'bg-slate-700/50 border-[#FFEF03]' : 'bg-white shadow-md border-[#174622]'}`}>
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <CheckCircle2 className={`w-5 h-5 ${darkMode ? 'text-[#FFEF03]' : 'text-[#174622]'}`}/> 
                          Our Promise
                        </h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          On-site supervision is compulsory in every contract we undertake. We also provide clear identification with standardized uniforms for all our personnel to ensure security and professionalism
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`p-6 rounded-2xl space-y-3 transition-colors ${darkMode ? 'bg-slate-700' : 'bg-white shadow-lg'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-[#175EAC]/20 text-[#60A5FA]' : 'bg-[#175EAC]/10 text-[#175EAC]'}`}>
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-xl">General Cleaning</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Malls, offices, hospitals, and homes</p>
                      </div>
                      
                      <div onClick={() => navigateTo('supplies')} className={`p-6 rounded-2xl space-y-3 sm:translate-y-8 transition-colors cursor-pointer group ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white shadow-lg hover:shadow-xl'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${darkMode ? 'bg-[#174622]/30 text-[#4ADE80]' : 'bg-[#174622]/10 text-[#174622]'}`}>
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-xl group-hover:text-[#175EAC] dark:group-hover:text-[#60A5FA] transition-colors">Supplies</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Toiletries, hygiene equipment & stationeries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </section>

            {/* Services Section */}
            <section id="services" className={`${sectionClass} overflow-hidden`}>
              <RevealOnScroll>
                <div className="max-w-7xl mx-auto">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h3 className="text-3xl md:text-5xl font-bold mb-6">Our Core Services</h3>
                    <p className={`text-lg px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Swipe to explore our comprehensive range of cleaning and hygiene solutions
                    </p>
                  </div>

                  <div className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 snap-x snap-mandatory hide-scrollbar">
                    {servicesList.map((service) => (
                      <div key={service.id} className={`flex-none w-80 rounded-2xl shadow-lg transition-all duration-500 border-t-4 border-[#175EAC] snap-center group hover:-translate-y-2 overflow-hidden flex flex-col ${darkMode ? 'bg-slate-800 hover:bg-slate-750' : 'bg-white'}`}>
                        <div className="w-full aspect-[5/4] relative overflow-hidden bg-gray-100 dark:bg-slate-700">
                          <img 
                            src={service.image} loading="lazy" decoding="async" 
                            alt={service.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                          />
                          <div style={{display: 'none'}} className="absolute inset-0 flex items-center justify-center">
                            <service.icon className="w-12 h-12 text-gray-300 dark:text-slate-500" />
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <h4 className="text-xl font-bold mb-3 transition-colors group-hover:text-[#175EAC]">{service.title}</h4>
                          <p className={`mb-6 flex-grow transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                          
                          <button onClick={() => { setQuoteType('service'); setQuoteForm({...quoteForm, serviceType: service.title}); setIsQuoteOpen(true); }} className={`inline-flex items-center font-bold transition-all mt-auto group/btn ${darkMode ? 'text-[#60A5FA] hover:text-[#FFEF03]' : 'text-[#175EAC] hover:text-[#174622]'}`}>
                            Request Quote <ChevronRight className="w-5 h-5 ml-1 group-hover/btn:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </section>

            {/* Specialized Section */}
            <section className={sectionAltClass}>
              <RevealOnScroll>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    <ul className="space-y-4">
                      {specializedAreas.map((area, idx) => (
                        <li key={idx} className="flex items-start gap-3 group">
                          <CheckCircle2 className={`w-6 h-6 shrink-0 transition-transform group-hover:scale-110 ${darkMode ? 'text-[#4ADE80]' : 'text-[#174622]'}`} />
                          <span className={`text-lg transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{area}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <h3 className={`text-2xl font-bold mb-6 pb-2 border-b-2 inline-block ${darkMode ? 'border-[#60A5FA] text-white' : 'border-[#175EAC] text-gray-900'}`}>Specialized Maintenance</h3>
                      <ul className="space-y-4">
                        {floorMaintenance.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 group">
                            <Star className={`w-6 h-6 shrink-0 transition-transform group-hover:scale-110 ${darkMode ? 'text-[#60A5FA]' : 'text-[#175EAC]'}`} />
                            <span className={`text-lg transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                          </li>
                        ))}
                        <li className={`flex items-start gap-3 mt-8 p-5 rounded-xl border transition-colors ${darkMode ? 'bg-slate-700/50 border-[#FFEF03]/30' : 'bg-[#FFEF03]/10 border-[#FFEF03]/30'}`}>
                           <span className={`font-semibold leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              Equipped with professional Scrubbing Machines, Air Blowers, Vacuum Cleaners, Kentucky Mops, and more.
                           </span>
                        </li>
                      </ul>
                    </div>
                </div>
              </RevealOnScroll>
            </section>

            {/* Clients Section (Grayscale to Color) */}
            <section id="clients" className={`${sectionClass} overflow-hidden pt-8 pb-20`}>
               <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-10">
                  <h2 className={`font-bold tracking-wider uppercase text-sm mb-2 ${darkMode ? 'text-[#FFEF03]' : 'text-[#174622]'}`}>Our Reputation</h2>
                  <h3 className="text-3xl md:text-4xl font-bold">Trusted by Industry Leaders</h3>
                </div>

                <div className={`absolute left-0 top-24 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r transition-colors duration-500 ${darkMode ? 'from-slate-900' : 'from-slate-50'} to-transparent`}></div>
                <div className={`absolute right-0 top-24 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l transition-colors duration-500 ${darkMode ? 'from-slate-900' : 'from-slate-50'} to-transparent`}></div>

                {/* Smart Scroll Carousel */}
                <div 
                  ref={scrollRef}
                  className="flex overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onTouchStart={() => setIsHovered(true)}
                  onTouchEnd={() => setIsHovered(false)}
                >
                  <div className="flex gap-4 md:gap-6 w-max px-2 py-4">
                    {[...clients, ...clients].map((client, idx) => {
                      // These two logos are light-on-transparent, so on the light theme they need
                      // a dark halo to read. Everything else is dark artwork and needs the opposite.
                      const isLightLogo = client.id === 'lounge' || client.id === 'nova';

                      const logoShadow = darkMode
                        ? 'drop-shadow(0 0 1.5px rgba(255,255,255,0.7)) drop-shadow(0 6px 14px rgba(0,0,0,0.55))'
                        : isLightLogo
                          ? 'drop-shadow(0 0 1.5px rgba(15,23,42,0.85)) drop-shadow(0 6px 14px rgba(15,23,42,0.35))'
                          : 'drop-shadow(0 6px 14px rgba(15,23,42,0.22))';

                      return (
                        <div key={`client-${idx}`} className="flex-none group py-2" title={client.name}>
                          <div className="relative h-28 w-28 md:h-36 md:w-36 flex items-center justify-center">
                             <img 
                                src={`client-${client.id}.png`} loading="lazy" decoding="async" 
                                alt={client.name}
                                style={{ filter: logoShadow }}
                                className="w-full h-full p-2 md:p-3 object-contain scale-110 transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:scale-[1.18]"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                             />
                             <div style={{display: 'none'}} className={`absolute inset-0 items-center justify-center p-3 text-center text-xs md:text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                               {client.name}
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
               </div>
            </section>
          </>
        )}

        {/* Cleaning Supplies Page */}
        {currentPage === 'supplies' && (
          <section className={`${sectionClass} min-h-[70vh] flex flex-col items-center justify-center animate-fade-in-up opacity-0`} style={{ animationDuration: '0.5s' }}>
            <div className="max-w-5xl mx-auto text-center pt-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cleaning Supplies</h1>
              <p className={`text-xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We provide a consistent supply of essential toiletries and hygiene products for your business
              </p>

              <div className="grid sm:grid-cols-3 gap-8 mb-12 text-left">
                {/* Tissue Card */}
                <div className={`rounded-2xl border transition-all duration-500 hover:-translate-y-2 group overflow-hidden flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:shadow-[0_10px_30px_rgba(255,239,3,0.05)]' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
                  <div className="w-full aspect-[5/4] relative overflow-hidden bg-gray-100 dark:bg-slate-700">
                    <img 
                      src="supply-tissue.jpg" loading="lazy" decoding="async" 
                      alt="Tissue" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-[#175EAC] dark:group-hover:text-[#60A5FA] transition-colors">Tissue</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Jumbo rolls, hand towels, and facial tissues</p>
                  </div>
                </div>

                {/* Hand Soaps Card */}
                <div className={`rounded-2xl border transition-all duration-500 hover:-translate-y-2 group overflow-hidden flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:shadow-[0_10px_30px_rgba(255,239,3,0.05)]' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
                  <div className="w-full aspect-[5/4] relative overflow-hidden bg-gray-100 dark:bg-slate-700">
                    <img 
                      src="supply-soap.jpg" loading="lazy" decoding="async" 
                      alt="Hand Soaps" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-[#175EAC] dark:group-hover:text-[#60A5FA] transition-colors">Hand Soaps</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Liquid hand wash and sanitizing dispensers</p>
                  </div>
                </div>

                {/* Air Fresheners Card */}
                <div className={`rounded-2xl border transition-all duration-500 hover:-translate-y-2 group overflow-hidden flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:shadow-[0_10px_30px_rgba(255,239,3,0.05)]' : 'bg-white border-gray-100 hover:shadow-xl'}`}>
                  <div className="w-full aspect-[5/4] relative overflow-hidden bg-gray-100 dark:bg-slate-700">
                    <img 
                      src="supply-freshener.jpg" loading="lazy" decoding="async" 
                      alt="Air Fresheners" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-[#175EAC] dark:group-hover:text-[#60A5FA] transition-colors">Air Fresheners</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Automatic dispensers and odor control solutions</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { setQuoteType('supply'); setIsQuoteOpen(true); }}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 mx-auto ${darkMode ? 'bg-[#FFEF03] text-slate-900 shadow-[0_0_20px_rgba(255,239,3,0.2)] hover:shadow-[0_0_30px_rgba(255,239,3,0.4)] hover:bg-yellow-400' : 'bg-[#174622] text-white shadow-lg hover:shadow-xl hover:bg-[#113318]'}`}
              >
                Request Supply Quote <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {/* Equipment Renting Page (Coming Soon) */}
        {currentPage === 'equipment' && (
          <section className={`${sectionClass} min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in-up opacity-0`} style={{ animationDuration: '0.5s' }}>
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 border-4 border-dashed transition-all duration-700 hover:rotate-180 hover:scale-110 ${darkMode ? 'border-slate-600 text-[#60A5FA]' : 'border-gray-300 text-[#175EAC]'}`}>
              <Briefcase className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Equipment Renting</h1>
            <div className={`inline-block mb-8 px-4 py-1.5 rounded-full border ${darkMode ? 'bg-slate-800 border-slate-700 text-[#FFEF03]' : 'bg-gray-100 border-gray-200 text-[#175EAC]'}`}>
              <p className="text-sm font-bold uppercase tracking-widest">Coming Soon</p>
            </div>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We are working on bringing you top-tier professional cleaning equipment for rent. Scrubbers, vacuums, polishers, and more.
            </p>
            <a
              href={`https://wa.me/${companyInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold inline-flex items-center transition-colors ${darkMode ? 'text-[#60A5FA] hover:text-white' : 'text-[#175EAC] hover:text-gray-900'}`}
            >
              Contact {companyInfo.phone} for more enquiries <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </section>
        )}

        {/* Footer Section */}
        <footer className={`transition-colors duration-500 ${darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-900 text-white'}`}>
          <RevealOnScroll>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center overflow-hidden shrink-0">
                    <img src="logo.png" alt="Logo" loading="lazy" decoding="async" className="w-full h-full object-contain filter brightness-0 invert" onError={(e) => { e.target.style.display='none'; }} />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-xl text-white">Extensive Janitorial</h2>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFEF03]">Services Ltd</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">
                  Nigeria's premier facility management company, delivering professional hygiene solutions with a commitment to excellence and reliability.
                </p>

                <div className="inline-block px-3 py-1 rounded-md border border-gray-700 bg-gray-800">
                  <p className="text-xs font-semibold text-gray-300 italic">"{companyInfo.motto}"</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Our Services</h3>
                <ul className="space-y-3">
                  <li><button onClick={() => { setQuoteType('service'); setQuoteForm({...quoteForm, serviceType: 'Cleaning Services'}); setIsQuoteOpen(true); }} className="text-sm text-gray-400 hover:text-[#60A5FA] transition-colors">General Cleaning</button></li>
                  <li><button onClick={() => { setQuoteType('service'); setQuoteForm({...quoteForm, serviceType: 'Post Construction Cleaning'}); setIsQuoteOpen(true); }} className="text-sm text-gray-400 hover:text-[#60A5FA] transition-colors">Post-Construction</button></li>
                  <li><button onClick={() => { setQuoteType('service'); setQuoteForm({...quoteForm, serviceType: 'Fumigation'}); setIsQuoteOpen(true); }} className="text-sm text-gray-400 hover:text-[#60A5FA] transition-colors">Fumigation & Pest Control</button></li>
                  <li><button onClick={() => { setQuoteType('service'); setQuoteForm({...quoteForm, serviceType: 'Derating'}); setIsQuoteOpen(true); }} className="text-sm text-gray-400 hover:text-[#60A5FA] transition-colors">Derating Services</button></li>
                  <li><button onClick={() => { setQuoteType('service'); setQuoteForm({...quoteForm, serviceType: 'Upholstery Cleaning'}); setIsQuoteOpen(true); }} className="text-sm text-gray-400 hover:text-[#60A5FA] transition-colors">Upholstery Cleaning</button></li>
                  <li><button onClick={() => navigateTo('supplies')} className="text-sm text-gray-400 hover:text-[#60A5FA] transition-colors">Toiletries Supply</button></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
                <ul className="space-y-3">
                  <li><button onClick={() => navigateTo('home')} className="text-sm text-gray-400 hover:text-[#FFEF03] transition-colors">Home / About Us</button></li>
                  <li><button onClick={() => navigateTo('supplies')} className="text-sm text-gray-400 hover:text-[#FFEF03] transition-colors">Cleaning Supplies</button></li>
                  <li><button onClick={() => navigateTo('equipment')} className="text-sm text-gray-400 hover:text-[#FFEF03] transition-colors">Equipment Renting (Soon)</button></li>
                  <li><button onClick={() => { setQuoteType('service'); setIsQuoteOpen(true); }} className="text-sm text-[#FFEF03] hover:text-white font-medium transition-colors">Request a Quote</button></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Contact Info</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                    <span className="leading-snug text-sm">{companyInfo.address}</span>
                  </li>
                  <li className="flex flex-col gap-2 text-gray-400">
                    <div className="flex items-center gap-3 hover:text-white transition-colors">
                      <Phone className="w-5 h-5 text-[#4ADE80] shrink-0" />
                      <a href={`tel:${telHref(companyInfo.phone)}`} className="text-sm">{companyInfo.phone} <span className="text-xs text-gray-500">(Main Line)</span></a>
                    </div>
                    <div className="flex items-center gap-3 hover:text-white transition-colors">
                      <div className="w-5 h-5 shrink-0"></div>
                      <a href={`tel:${telHref(companyInfo.mdPhone)}`} className="text-sm">{companyInfo.mdPhone} <span className="text-xs text-gray-500">(MD)</span></a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-[#FFEF03] shrink-0" />
                    <a href={`mailto:${companyInfo.email}`} className="break-all text-sm">{companyInfo.email}</a>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400 pt-2 border-t border-gray-800">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="text-sm">
                      <p>Available 24/7</p>
                      <p className="text-xs text-gray-500 mt-1">Ready for emergencies anytime.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${darkMode ? 'border-slate-800' : 'border-gray-800'}`}>
              <p className="text-center md:text-left text-sm text-gray-500">&copy; {new Date().getFullYear()} Extensive Janitorial Services Limited. All rights reserved.</p>
              
              <div className="flex items-center gap-6">
                <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white py-2 px-5 rounded-full font-bold items-center justify-center gap-2 transition-transform transform hover:-translate-y-1 shadow-lg text-sm">
                   WhatsApp Us
                </a>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 text-gray-400 hover:text-white" aria-label="Toggle Theme">
                  {darkMode ? <Sun className="w-5 h-5 text-[#FFEF03]" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
            </div>
          </RevealOnScroll>
        </footer>

      </main>

      {/* Quote Modal Overlay */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl my-auto border transform transition-all ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>

            <div className={`flex justify-between items-center p-6 border-b ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {quoteType === 'supply' ? 'Request Cleaning Supplies' : 'Request Service Quote'}
              </h3>
              <button onClick={() => setIsQuoteOpen(false)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {quoteType === 'supply' ? (
              /* SUPPLY FORM */
              <form onSubmit={submitSupply} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name *</label>
                    <input required type="text" name="fullName" value={supplyForm.fullName} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                    <input required type="email" name="email" value={supplyForm.email} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number *</label>
                    <input required type="tel" name="phone" value={supplyForm.phone} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company/Organization</label>
                    <input type="text" name="company" value={supplyForm.company} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Delivery Address *</label>
                  <input required type="text" name="address" placeholder="Full delivery address" value={supplyForm.address} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20 placeholder-slate-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20 placeholder-gray-400'}`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Items Interested In *</label>
                    <select required name="items" value={supplyForm.items} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`}>
                      <option value="">Select primary item</option>
                      <option value="Tissue">Tissue</option>
                      <option value="Hand Soaps">Hand Soaps</option>
                      <option value="Air Fresheners">Air Fresheners</option>
                      <option value="Multiple/All Items">Multiple / All Items</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Estimated Quantity</label>
                    <input type="text" name="quantity" placeholder="e.g., 5 Cartons, 20 Litres" value={supplyForm.quantity} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20 placeholder-slate-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20 placeholder-gray-400'}`} />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional Details</label>
                  <textarea rows="3" placeholder="Any specific brands, sizes, or questions?" name="details" value={supplyForm.details} onChange={handleSupplyChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all resize-none ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20 placeholder-slate-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20 placeholder-gray-400'}`}></textarea>
                </div>

                <div className={`pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                  <button type="submit" className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${darkMode ? 'bg-[#FFEF03] text-slate-900 hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,239,3,0.3)]' : 'bg-[#175EAC] text-white hover:bg-[#124b89] shadow-[0_0_15px_rgba(23,94,172,0.3)]'}`}>
                    Submit Supply Request <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            ) : (
              /* SERVICE FORM */
              <form onSubmit={submitQuote} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name *</label>
                    <input required type="text" name="fullName" value={quoteForm.fullName} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                    <input required type="email" name="email" value={quoteForm.email} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number *</label>
                    <input required type="tel" name="phone" value={quoteForm.phone} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company/Organization</label>
                    <input type="text" name="company" value={quoteForm.company} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Service Type *</label>
                    <select required name="serviceType" value={quoteForm.serviceType} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`}>
                      <option value="">Select service type</option>
                      {servicesList.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Property Type</label>
                    <select name="propertyType" value={quoteForm.propertyType} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`}>
                      <option value="">Select property type</option>
                      <option value="Commercial">Commercial / Office</option>
                      <option value="Residential">Residential / Home</option>
                      <option value="Industrial">Industrial / Warehouse</option>
                      <option value="Retail">Retail / Mall</option>
                      <option value="Healthcare">Healthcare / Hospital</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Approximate Square Footage</label>
                    <input type="text" name="sqFt" placeholder="e.g., 2,000 sq ft" value={quoteForm.sqFt} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20 placeholder-slate-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20 placeholder-gray-400'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Cleaning Frequency</label>
                    <select name="frequency" value={quoteForm.frequency} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20'}`}>
                      <option value="">Select frequency</option>
                      <option value="One-time">One-time / Deep Clean</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-Weekly">Bi-Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional Details</label>
                  <textarea rows="3" placeholder="Please describe any specific requirements, areas of focus, or questions you have..." name="details" value={quoteForm.details} onChange={handleQuoteChange} className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none transition-all resize-none ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-[#60A5FA] focus:ring-[#60A5FA]/20 placeholder-slate-500' : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#175EAC] focus:ring-[#175EAC]/20 placeholder-gray-400'}`}></textarea>
                </div>

                <div className={`pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                  <button type="submit" className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${darkMode ? 'bg-[#FFEF03] text-slate-900 hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,239,3,0.3)]' : 'bg-[#175EAC] text-white hover:bg-[#124b89] shadow-[0_0_15px_rgba(23,94,172,0.3)]'}`}>
                    Get Free Quote <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}