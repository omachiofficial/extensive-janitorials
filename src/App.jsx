import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, CheckCircle2, 
  Briefcase, Droplets, SprayCan as Spray, 
  Wind, Truck, ShoppingBag, Sofa, 
  ChevronRight, Moon, Sun, Star, ArrowRight
} from 'lucide-react';

const companyInfo = {
  name: 'Extensive Janitorial Services Limited',
  address: 'H3, Shared Office, Novare Gateway Mall, Lugbe Abuja',
  email: 'extensivejanitorialservicesltd@gmail.com',
  phone: '08083316586',
  rcNumber: '1987912',
  whatsapp: '2348083316586',
  logoUrl: 'logo.png' // Updated to the new .png filename
};

const servicesList = [
  { id: 1, title: 'Cleaning Services', icon: Droplets, description: 'Comprehensive general cleaning for offices, malls, and homes.', image: 'service-cleaning.jpg' },
  { id: 2, title: 'Post Construction Cleaning', icon: Briefcase, description: 'Detailed cleanup for newly built or renovated sites.', image: 'service-post-construction.jpg' },
  { id: 3, title: 'Fumigation', icon: Spray, description: 'Indoor and outdoor pest control and fumigation exercises.', image: 'service-fumigation.jpg' },
  { id: 4, title: 'Derating', icon: Wind, description: 'Professional rodent control and elimination services.', image: 'service-derating.jpg' },
  { id: 5, title: 'Equipment Renting', icon: Truck, description: 'Rent professional cleaning equipment like scrubbers and vacuums.', image: 'service-equipment.jpg' },
  { id: 6, title: 'Supply of Toiletries', icon: ShoppingBag, description: 'Consistent supply of essential toiletries and hygiene products.', image: 'service-toiletries.jpg' },
  { id: 7, title: 'Upholstery Cleaning', icon: Sofa, description: 'Deep cleaning for sofas, carpets, and other upholstery.', image: 'service-upholstery.jpg' }
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
  { name: 'Infrostrategy Technology Limited (I-Recharge)', location: 'Wuse 2, Abuja' },
  { name: 'Novare Central Mall (Shoprite)', location: 'Wuse 5, Abuja' },
  { name: 'Gateway Mall (Shoprite)', location: 'Lugbe, Abuja' },
  { name: 'Apo Mall (Shoprite)', location: 'Apo-FCT, Abuja' },
  { name: 'Builditect Limited (Mall@18)', location: 'Abuja' },
  { name: '2Tshie Dental Clinic', location: 'Novare Mall, Apo & Jabi Lake Mall' },
  { name: 'Artee Group of Company', location: 'Novare Mall Wuse Zone 5' },
  { name: 'Federal Medical Center', location: 'Keffi, Nasarawa State' },
  { name: 'Maypass Co-Work Space', location: 'Wuse Zone 5, Abuja' },
  { name: 'Hello Tractor', location: 'Maitama, Abuja' }
];

const generateWhatsAppLink = (serviceName = '') => {
  const message = serviceName 
    ? `Hello Extensive Janitorial Services, I am interested in your ${serviceName}. Please provide more details.`
    : `Hello Extensive Janitorial Services, I would like to make an inquiry.`;
  return `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(message)}`;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const sectionClass = `py-16 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ease-in-out ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`;
  const sectionAltClass = `py-16 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ease-in-out ${darkMode ? 'bg-slate-800 text-white' : 'bg-gray-50 text-gray-900'}`;
  const cardClass = `flex-none w-72 sm:w-80 rounded-2xl shadow-lg transition-all duration-300 border-t-4 border-[#175EAC] snap-center overflow-hidden flex flex-col ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:shadow-xl'}`;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ease-in-out ${darkMode ? 'dark bg-slate-900' : 'bg-white'}`}>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-slate-900/95 border-b border-slate-700' : 'bg-white/95 shadow-sm backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Hamburger Menu (Left) */}
            <div className="flex-1 flex justify-start">
              <button onClick={toggleMenu} className={`p-2 -ml-2 rounded-md transition-colors ${darkMode ? 'text-white hover:bg-slate-800' : 'text-gray-900 hover:bg-gray-100'}`}>
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>

            {/* Logo area (Center) - Fixed Squeezing */}
            <div className="flex items-center gap-2 sm:gap-3 justify-center shrink-0 px-2">
              <div className="w-auto h-10 sm:h-12 flex items-center justify-center shrink-0">
                 <img 
                    src="logo.png" 
                    alt="Extensive Janitorial Logo" 
                    className="h-full w-auto object-contain" 
                    onError={(e) => { 
                      e.target.style.display='none'; 
                      if (e.target.nextSibling) e.target.nextSibling.style.display='block'; 
                    }} 
                 />
                 <span style={{display: 'none'}} className="text-[#FFEF03] font-bold text-xl">EJ</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className={`font-black text-base sm:text-xl tracking-tight leading-none whitespace-nowrap ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Extensive Janitorial
                </span>
                <span className={`font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap ${darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]'}`}>
                  Services Ltd.
                </span>
              </div>
            </div>

            {/* Actions (Right) */}
            <div className="flex items-center justify-end flex-1">
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer" 
                className="hidden sm:flex bg-[#174622] hover:bg-[#113318] text-white px-5 py-2 rounded-full font-medium transition-transform transform hover:scale-105 shadow-md items-center gap-2 text-sm"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        {/* Floating Context-style Menu (Left aligned now due to hamburger change) */}
        <div className={`absolute top-20 left-4 sm:left-6 lg:left-8 mt-1 w-56 rounded-xl shadow-2xl transition-all duration-200 ease-out origin-top-left border ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} ${darkMode ? 'bg-[#1e293b] border-slate-700 shadow-black/50' : 'bg-white border-gray-200 shadow-gray-200/50'}`}>
          <div className="py-2 flex flex-col">
            <a href="#about" onClick={toggleMenu} className={`px-4 py-2.5 text-[15px] text-left transition-colors ${darkMode ? 'text-gray-200 hover:bg-slate-700/50' : 'text-gray-700 hover:bg-gray-50'}`}>About Us</a>
            <a href="#services" onClick={toggleMenu} className={`px-4 py-2.5 text-[15px] text-left transition-colors ${darkMode ? 'text-gray-200 hover:bg-slate-700/50' : 'text-gray-700 hover:bg-gray-50'}`}>Our Services</a>
            <a href="#clients" onClick={toggleMenu} className={`px-4 py-2.5 text-[15px] text-left transition-colors ${darkMode ? 'text-gray-200 hover:bg-slate-700/50' : 'text-gray-700 hover:bg-gray-50'}`}>Our Clients</a>
            
            <div className={`my-1 border-t ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}></div>
            
            <a href={generateWhatsAppLink()} onClick={toggleMenu} target="_blank" rel="noopener noreferrer" className={`px-4 py-2.5 text-[15px] font-medium text-left transition-colors ${darkMode ? 'text-[#4ADE80] hover:bg-slate-700/50' : 'text-[#174622] hover:bg-gray-50'}`}>
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className={`relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-slate-900' : 'bg-[#f8fafc]'}`}>
          <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none ${darkMode ? 'opacity-20' : 'opacity-40'}`}></div>
          
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-[300px] w-[600px] rounded-full bg-gradient-to-br from-[#175EAC]/20 to-[#174622]/20 blur-[80px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-8 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Impeccable Cleaning.<br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-[#FFEF03] to-[#60A5FA]' : 'from-[#175EAC] to-[#174622]'}`}>
                Unmatched Professionalism.
              </span>
            </h1>
            
            <p className={`max-w-2xl mx-auto text-lg md:text-xl mb-12 transition-colors leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We specialize in providing top-tier janitorial services, post-construction cleaning, fumigation, and hygiene solutions across Nigeria.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-[#174622] hover:bg-[#113318] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_8px_30px_rgb(23,70,34,0.3)] hover:shadow-[0_8px_30px_rgb(23,70,34,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Hire Us Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#services"
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all border-2 flex items-center justify-center hover:-translate-y-1 ${darkMode ? 'border-slate-700 text-gray-300 hover:bg-slate-800' : 'border-gray-200 text-gray-700 hover:bg-white hover:shadow-md'}`}
              >
                Explore Services
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={sectionAltClass}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <h2 className={`font-bold tracking-wider uppercase text-sm ${darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]'}`}>Company Profile</h2>
                  {/* RC Number moved here, next to Company Profile on desktop, below on mobile */}
                  <span className={`inline-flex items-center justify-center w-fit text-xs font-semibold px-3 py-1.5 rounded-full border ${darkMode ? 'border-[#FFEF03]/30 text-[#FFEF03] bg-[#FFEF03]/10' : 'border-[#175EAC]/20 text-[#175EAC] bg-white'}`}>RC No: {companyInfo.rcNumber}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Dedicated to maintaining exceptional environments.</h3>
                
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Registered in Nigeria with the Corporate Affairs Commission, Extensive Janitorial Services Limited is committed to adhering to all government legislations including Minimum Wage, Social Security, and Tax Deductions.
                </p>
                
                <div className={`p-6 rounded-2xl border-l-4 transition-colors ${darkMode ? 'bg-slate-700/50 border-[#FFEF03]' : 'bg-white shadow-md border-[#174622]'}`}>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className={`w-5 h-5 ${darkMode ? 'text-[#FFEF03]' : 'text-[#174622]'}`}/> 
                    Our Promise
                  </h4>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    On-site supervision is compulsory in every contract we undertake. We also provide clear identification with standardized uniforms for all our personnel to ensure security and professionalism.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-6 rounded-2xl space-y-3 transition-colors ${darkMode ? 'bg-slate-700' : 'bg-white shadow-lg'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-[#175EAC]/20 text-[#60A5FA]' : 'bg-[#175EAC]/10 text-[#175EAC]'}`}>
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">General Cleaning</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Malls, offices, hospitals, and homes.</p>
                </div>
                
                <div className={`p-6 rounded-2xl space-y-3 sm:translate-y-8 transition-colors ${darkMode ? 'bg-slate-700' : 'bg-white shadow-lg'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-[#174622]/30 text-[#4ADE80]' : 'bg-[#174622]/10 text-[#174622]'}`}>
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Supplies</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Toiletries, hygiene equipment & stationeries.</p>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`${sectionClass} overflow-hidden`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className={`font-bold tracking-wider uppercase text-sm mb-2 ${darkMode ? 'text-[#FFEF03]' : 'text-[#175EAC]'}`}>What We Do</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6">Our Core Services</h3>
              <p className={`text-lg px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Swipe to explore our comprehensive range of cleaning and hygiene solutions.
              </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
              `}} />
              {servicesList.map((service) => (
                <div key={service.id} className={cardClass}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-48 object-cover border-b border-gray-100 dark:border-slate-700 shrink-0"
                    onError={(e) => { 
                      e.target.src = `https://placehold.co/400x300/175EAC/FFFFFF?text=${encodeURIComponent(service.title)}`; 
                    }}
                  />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${darkMode ? 'bg-slate-700 text-[#FFEF03]' : 'bg-[#FFEF03]/20 text-[#174622]'}`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold leading-tight">{service.title}</h4>
                    </div>
                    <p className={`mb-6 flex-grow text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                    
                    <a 
                      href={generateWhatsAppLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center font-semibold transition-colors mt-auto group ${darkMode ? 'text-[#60A5FA] hover:text-white' : 'text-[#175EAC] hover:text-[#174622]'}`}
                    >
                      Order Service <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Areas */}
        <section className={sectionAltClass}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              
              <div>
                <h3 className={`text-2xl font-bold mb-6 pb-2 border-b-2 inline-block ${darkMode ? 'border-[#FFEF03] text-white' : 'border-[#174622] text-gray-900'}`}>General Property Cleaning</h3>
                <ul className="space-y-4">
                  {specializedAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <CheckCircle2 className={`w-6 h-6 shrink-0 transition-transform group-hover:scale-110 ${darkMode ? 'text-[#4ADE80]' : 'text-[#174622]'}`} />
                      <span className={`text-lg transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className={`${sectionClass} overflow-hidden`}>
           <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`font-bold tracking-wider uppercase text-sm mb-2 ${darkMode ? 'text-[#FFEF03]' : 'text-[#174622]'}`}>Our Reputation</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h3>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Swipe to see who trusts us.</p>
            </div>
            
            <div className="flex overflow-x-auto gap-4 pb-8 pt-4 px-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
               <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar { display: none; }
              `}} />
              {clients.map((client, idx) => (
                <div key={idx} className={`flex-none w-72 sm:w-80 p-6 rounded-xl border snap-center transition-all duration-300 ${darkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-gray-200 bg-white hover:border-[#175EAC]/50 hover:shadow-md'}`}>
                  <h4 className={`font-bold text-lg mb-2 line-clamp-2 ${darkMode ? 'text-[#60A5FA]' : 'text-[#175EAC]'}`}>{client.name}</h4>
                  <div className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{client.location}</span>
                  </div>
                  <div className={`mt-4 inline-block px-3 py-1 text-xs rounded-full font-medium ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'}`}>
                    Cleaning Services
                  </div>
                </div>
              ))}
            </div>
           </div>
        </section>

        {/* Footer Section */}
        <footer className={`transition-colors duration-500 ${darkMode ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-900 text-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
              
              {/* Brand Col */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-auto h-16 flex items-center justify-start shrink-0">
                    <img 
                        src="logo.png" 
                        alt="Logo" 
                        className="h-full w-auto object-contain" 
                        onError={(e) => { e.target.style.display='none'; }} 
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-xl tracking-tight text-white whitespace-nowrap">
                      Extensive Janitorial
                    </span>
                    <span className="font-semibold text-[13px] tracking-[0.1em] text-[#FFEF03] uppercase whitespace-nowrap">
                      Services Limited
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Delivering impeccable cleaning and hygiene services across Nigeria.
                </p>
              </div>

              {/* Contact Info Col */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Contact Info</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                    <span className="leading-snug">{companyInfo.address}</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <Phone className="w-5 h-5 text-[#4ADE80] shrink-0" />
                    <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-[#FFEF03] shrink-0" />
                    <a href={`mailto:${companyInfo.email}`} className="break-all">{companyInfo.email}</a>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Ready to Start?</h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Send us a direct message on WhatsApp for quick inquiries, bookings, or consultations.
                </p>
                <a 
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-8 rounded-full font-bold items-center justify-center gap-2 transition-transform transform hover:scale-105 shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            
            <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${darkMode ? 'border-slate-800 text-gray-500' : 'border-gray-800 text-gray-400'}`}>
              <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Extensive Janitorial Services Limited. All rights reserved.</p>
              
              <div className="flex items-center gap-6">
                {/* Theme Toggle moved to footer */}
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className={`p-2 rounded-full transition-colors flex items-center gap-2 ${darkMode ? 'hover:bg-slate-800 text-[#FFEF03]' : 'hover:bg-gray-800 text-gray-300'}`}
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? <><Sun className="w-5 h-5" /><span className="text-sm font-medium">Light Mode</span></> : <><Moon className="w-5 h-5" /><span className="text-sm font-medium">Dark Mode</span></>}
                </button>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}