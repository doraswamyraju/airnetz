import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wifi, Tv, ShieldCheck, Rocket, Zap, Users, Headphones, Star, 
  ArrowRight, Smartphone, Share2, Plus, Minus, CheckCircle2, Play,
  ChevronUp, ChevronDown, Map, Gamepad2, Timer, Quote
} from 'lucide-react';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const stats = [
    { label: 'Happy Families', value: '50k+', icon: Users },
    { label: 'Uptime Guarantee', value: '99.9%', icon: ShieldCheck },
    { label: 'Max Speed', value: '1 Gbps', icon: Zap },
    { label: 'Support', value: '24/7', icon: Headphones },
  ];

  const partners = [
    'Netflix', 'Prime Video', 'Disney+ Hotstar', 'SonyLIV', 'Zee5', 'SunNXT', 'JioCinema', 'Discovery+'
  ];

  const faqs = [
    { 
      q: "Does Airnetz provide a free router?", 
      a: "Yes! We provide a high-performance Dual-Band Wi-Fi Router (worth ₹2500) completely free of cost with all our 6-month and 12-month subscription plans." 
    },
    { 
      q: "What is the installation timeframe?", 
      a: "Our standard installation time is within 24 hours of booking. In many areas of Tirupati, we offer priority same-day installation for morning bookings." 
    },
    { 
      q: "Can I upgrade my plan later?", 
      a: "Absolutely. You can upgrade your speed or data plan instantly through our mobile app or by calling customer support. The speed increase is immediate." 
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "MR Palli, Tirupati",
      text: "I moved from another provider to Airnetz for gaming. The latency is consistently under 5ms to Mumbai servers. Absolutely worth the gamer plan.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Priya Sharma",
      location: "Alipiri Road",
      text: "Work from home is a breeze now. No disconnections during Zoom calls, and the support team actually picks up the phone instantly!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Venkatesh R.",
      location: "Renigunta",
      text: "The OTT bundle is a money saver. I got Netflix and Hotstar included in my bill. Installation was done within 4 hours of booking.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden font-sans">
      
      {/* 1. Ultra Premium Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Fiber Network" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-semibold text-white tracking-wide"> #1 Fiber Network in Tirupati</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[1.1] text-white animate-fade-in-up">
            Speed Beyond <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-brand-orange animate-shimmer bg-[length:200%_auto]">Limits</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
            Upgrade to Tirupati's only pure fiber network. Experience 1 Gbps speeds, 0ms lag, and 4K streaming on every device.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto animate-fade-in-up delay-200">
            <Link 
              to="/book"
              className="group px-10 py-5 bg-brand-orange hover:bg-orange-600 text-white rounded-full font-bold text-lg transition-all shadow-[0_10px_30px_rgba(249,115,22,0.4)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.6)] hover:-translate-y-1 flex items-center gap-3"
            >
              Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link 
              to="/broadband"
              className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md rounded-full font-bold text-lg border border-white/20 transition-all hover:border-white/50"
            >
              View Plans
            </Link>
          </div>
        </div>

        {/* Floating Abstract Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 hidden lg:block animate-float">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] opacity-80" alt="Cyber abstract" />
        </div>
      </section>

      {/* 2. Stats Section - Glassmorphism */}
      <section className="relative z-20 -mt-24 px-4">
        <div className="max-w-7xl mx-auto glass-card rounded-3xl p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center p-4 hover:bg-white/50 rounded-2xl transition-all duration-300 group cursor-default">
                <div className="mb-4 p-4 bg-primary-50 text-primary-600 rounded-full group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-lg">
                  <stat.icon size={28} />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Partners/OTT Marquee Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Entertainment Partners</h3>
           <p className="text-2xl font-display font-bold text-gray-900">Bundled with the world's best content</p>
        </div>
        <div className="relative flex overflow-x-hidden group py-4 bg-white/50 backdrop-blur-sm border-y border-gray-200">
          <div className="animate-marquee whitespace-nowrap flex gap-20 items-center">
            {[...partners, ...partners, ...partners].map((partner, i) => (
               <span key={i} className="text-4xl font-display font-bold text-gray-300 hover:text-gray-900 transition-colors cursor-default select-none">
                 {partner}
               </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        </div>
      </section>

      {/* 4. Feature Showcase (Gaming & Streaming) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-[2rem] transform rotate-3 scale-105 opacity-20 blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Gaming Setup" 
                  className="relative z-10 rounded-[2rem] shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500" 
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-10 -right-10 z-20 bg-white p-6 rounded-2xl shadow-xl animate-float">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-100 text-red-600 rounded-full">
                         <Timer size={24} />
                      </div>
                      <div>
                         <div className="text-xs text-gray-500 font-bold uppercase">Ping</div>
                         <div className="text-2xl font-bold text-gray-900">&lt; 5ms</div>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="order-1 lg:order-2">
                <span className="text-purple-600 font-bold tracking-wider uppercase text-sm mb-4 block">Engineered for Performance</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
                   Dominate the Game. <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Zero Lag. Pure Speed.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                   Stop blaming the lag. Our dedicated gaming routes ensure your packets take the shortest path to the server. Lower ping, zero packet loss, and smoother gameplay.
                </p>
                <ul className="space-y-4 mb-10">
                   {[
                      'Direct peering with major gaming servers',
                      'Symmetrical Upload/Download speeds',
                      'Static IP available for hosting',
                      'No FUP limits on gaming traffic'
                   ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700 font-medium group">
                         <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <CheckCircle2 size={14} strokeWidth={3} />
                         </div>
                         {item}
                      </li>
                   ))}
                </ul>
                <Link to="/broadband" className="inline-flex items-center text-purple-600 font-bold hover:text-purple-700 hover:underline text-lg">
                   Check Gamer Plans <ArrowRight size={20} className="ml-2" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works (Process) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Get Connected in 3 Simple Steps</h2>
               <p className="text-xl text-gray-600">We've simplified the process so you can get online faster.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               {/* Connector Line */}
               <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent border-t-2 border-dashed border-gray-300"></div>

               {[
                  { title: 'Choose Your Plan', desc: 'Select the speed and data that fits your needs.', icon: Zap, color: 'blue' },
                  { title: 'Book Installation', desc: 'Fill the form. Our team calls you within 15 mins.', icon: Smartphone, color: 'orange' },
                  { title: 'Get Connected', desc: 'Expert installation and WiFi setup within 24 hours.', icon: Wifi, color: 'green' }
               ].map((step, i) => (
                  <div key={i} className="relative flex flex-col items-center text-center group">
                     <div className={`w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center mb-8 relative z-10 border-4 border-${step.color}-100 group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon size={40} className={`text-${step.color}-500`} />
                        <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${step.color}-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg`}>{i + 1}</div>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                     <p className="text-gray-600 leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. Premium Plans Preview */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div>
               <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Pricing</span>
               <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Plans designed for <span className="text-brand-orange">Speed</span></h2>
               <p className="text-slate-400 text-lg">Simple, transparent pricing. No hidden fees.</p>
             </div>
             <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold shadow-lg transition-all">Monthly</button>
                <button className="px-6 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-semibold transition-colors">Yearly (2 Months Free)</button>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-700 hover:border-slate-500 transition-all group hover:-translate-y-2 flex flex-col">
                 <div className="text-slate-400 font-semibold mb-4 uppercase tracking-wider text-sm">Starter</div>
                 <div className="flex items-baseline mb-6">
                   <span className="text-5xl font-display font-bold text-white">₹499</span>
                   <span className="text-slate-500 ml-2">/mo</span>
                 </div>
                 <div className="flex items-center gap-3 text-white mb-8 bg-slate-700/50 p-3 rounded-xl border border-slate-600">
                   <Wifi size={24} className="text-primary-400" /> 
                   <span className="font-bold text-lg">40 Mbps Speed</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-slate-300 flex-grow">
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-400" /> Unlimited Data</li>
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-400" /> Free Installation*</li>
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-400" /> 24/7 Support</li>
                 </ul>
                 <Link to="/book?plan=starter" className="block w-full py-4 border border-slate-600 text-white text-center rounded-xl font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors">Select Plan</Link>
              </div>
              
              {/* Streamer Plan (Highlighted) */}
              <div className="bg-gradient-to-b from-primary-900 to-slate-900 p-8 rounded-[2rem] border border-primary-500/50 relative transform md:-translate-y-6 shadow-2xl shadow-primary-900/40 hover:-translate-y-8 transition-all duration-300 flex flex-col">
                 <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-[1.8rem] shadow-lg">MOST POPULAR</div>
                 <div className="text-primary-300 font-semibold mb-4 uppercase tracking-wider text-sm">Streamer</div>
                 <div className="flex items-baseline mb-6">
                   <span className="text-6xl font-display font-bold text-white">₹799</span>
                   <span className="text-slate-500 ml-2">/mo</span>
                 </div>
                 <div className="flex items-center gap-3 text-white mb-8 bg-primary-600/20 p-3 rounded-xl border border-primary-500/30">
                   <Wifi size={24} className="text-brand-orange" /> 
                   <span className="font-bold text-lg">100 Mbps Speed</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-slate-200 flex-grow">
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-brand-orange" /> Unlimited Data</li>
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-brand-orange" /> Free Dual-Band Router</li>
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-brand-orange" /> 3 OTT Apps Included</li>
                 </ul>
                 <Link to="/book?plan=streamer" className="block w-full py-4 bg-gradient-to-r from-brand-orange to-orange-600 text-white text-center rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all">Get Connected</Link>
              </div>

              {/* Gamer Plan */}
              <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-700 hover:border-slate-500 transition-all group hover:-translate-y-2 flex flex-col">
                 <div className="text-slate-400 font-semibold mb-4 uppercase tracking-wider text-sm">Gamer</div>
                 <div className="flex items-baseline mb-6">
                   <span className="text-5xl font-display font-bold text-white">₹1299</span>
                   <span className="text-slate-500 ml-2">/mo</span>
                 </div>
                 <div className="flex items-center gap-3 text-white mb-8 bg-slate-700/50 p-3 rounded-xl border border-slate-600">
                   <Wifi size={24} className="text-purple-400" /> 
                   <span className="font-bold text-lg">300 Mbps Speed</span>
                 </div>
                 <ul className="space-y-4 mb-10 text-slate-300 flex-grow">
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-400" /> Unlimited Data</li>
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-400" /> Free Mesh Router</li>
                    <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-400" /> Netflix & Prime Included</li>
                 </ul>
                 <Link to="/book?plan=gamer" className="block w-full py-4 border border-slate-600 text-white text-center rounded-xl font-semibold hover:border-brand-orange hover:text-brand-orange transition-colors">Select Plan</Link>
              </div>
           </div>
        </div>
      </section>

      {/* 7. Testimonials Section (Refactored for Mobile Slider) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 block">Testimonials</span>
             <h2 className="text-4xl font-display font-bold text-gray-900">Loved by Tirupati</h2>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 scrollbar-hide">
             {testimonials.map((t, i) => (
                <div key={i} className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                   <Quote className="absolute top-8 right-8 text-primary-100 fill-current" size={40} />
                   <div className="flex items-center gap-4 mb-6">
                      <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary-500 p-0.5" />
                      <div>
                         <h4 className="font-bold text-lg text-gray-900">{t.name}</h4>
                         <span className="text-sm text-gray-500">{t.location}</span>
                      </div>
                   </div>
                   <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                   </div>
                   <p className="text-gray-600 leading-relaxed italic flex-grow">"{t.text}"</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. Coverage Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 opacity-40">
                 <img src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Map" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
              
              <div className="relative z-10 p-12 md:p-20 max-w-2xl">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-orange rounded-lg text-white"><Map size={24} /></div>
                    <span className="text-brand-orange font-bold uppercase tracking-wider">Widest Coverage</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Connecting Every Corner of Tirupati</h2>
                 <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    From Alipiri to Renigunta, we have laid over 500km of fiber optic cables to ensure your home is network ready. 
                 </p>
                 <div className="flex flex-wrap gap-4 mb-10">
                    {['Alipiri', 'MR Palli', 'KT Road', 'Tiruchanur', 'Renigunta Road', 'Bairagipatteda'].map(area => (
                       <span key={area} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20">
                          {area}
                       </span>
                    ))}
                 </div>
                 <Link to="/book" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-block">
                    Check Availability in My Area
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 9. App Showcase */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative group">
               <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 transition-opacity group-hover:opacity-75"></div>
               <img 
                 src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop" 
                 alt="Mobile App Interface" 
                 className="relative z-10 rounded-[2.5rem] shadow-2xl border-[8px] border-gray-900 mx-auto max-w-[280px] lg:max-w-xs transform group-hover:scale-105 transition-transform duration-500"
               />
               {/* Floating elements */}
               <div className="absolute top-20 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-float hidden sm:block border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Wifi size={20} /></div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold uppercase">Speed</div>
                      <div className="font-bold text-gray-900 text-lg">300 Mbps</div>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">Total Control at Your Fingertips</h2>
              <p className="text-xl text-gray-600 mb-10">
                The Airnetz App puts the power of your network in your hands. Manage WiFi, payments, and support instantly.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div className="flex flex-col gap-2">
                   <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                      <Smartphone size={24} />
                   </div>
                   <h4 className="text-lg font-bold text-gray-900">Manage Devices</h4>
                   <p className="text-sm text-gray-600">See who's connected and pause access.</p>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-brand-orange mb-2">
                      <Zap size={24} />
                   </div>
                   <h4 className="text-lg font-bold text-gray-900">Turbo Button</h4>
                   <p className="text-sm text-gray-600">Boost speed instantly for 24 hours.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                 <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg hover:-translate-y-1">
                   <Play size={20} className="fill-current" /> Google Play
                 </button>
                 <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg hover:-translate-y-1">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" className="w-4 h-4" alt="Apple" /> App Store
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section - Styled */}
      <section className="py-24 bg-white">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-display font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
               {faqs.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
                     <button 
                       onClick={() => toggleFaq(index)}
                       className={`w-full flex justify-between items-center p-6 text-left font-semibold text-lg text-gray-900 bg-white transition-colors ${openFaq === index ? 'text-primary-600 bg-gray-50' : ''}`}
                     >
                       {item.q}
                       {openFaq === index ? <ChevronUp size={20} className="text-primary-600" /> : <ChevronDown size={20} className="text-gray-400" />}
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
                           {item.a}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="text-center mt-10">
               <Link to="/support" className="inline-flex items-center text-primary-600 font-bold hover:underline">
                  Visit Help Center <ArrowRight size={18} className="ml-2" />
               </Link>
            </div>
         </div>
      </section>

      {/* 11. Bottom CTA */}
      <section className="py-32 bg-slate-900 text-white text-center relative overflow-hidden">
         <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="Team" />
             <div className="absolute inset-0 bg-slate-900/80"></div>
         </div>
         <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 tracking-tight">Ready to experience <span className="text-brand-orange">Airnetz</span>?</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
               Join 50,000+ happy families in Tirupati today. 30-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link to="/book" className="px-12 py-5 bg-brand-orange text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:scale-105">
                 Get New Connection
               </Link>
               <Link to="/broadband" className="px-12 py-5 bg-transparent border-2 border-slate-600 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all">
                 View All Plans
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;