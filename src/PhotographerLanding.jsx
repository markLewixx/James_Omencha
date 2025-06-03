import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ArrowRight,
  Play,
  Award,
  Users,
  Heart,
} from "lucide-react";
import Nav from "./components/Nav";

const PhotographerLanding = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Hero images rotation
  const heroImages = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuJTIwYWZyaWNhbiUyMHBob3RvZ3JhcGhlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2132&q=80",
  ];

  // Portfolio images
  const portfolioImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1694105465527-df238beaba11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEFmcmljYW4lMjBldmVudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1708006247791-00eee9388480?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW4lMjBhZnJpY2FuJTIwcGhvdG9ncmFwaGVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594780841377-e05e12d0d1ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW4lMjBhZnJpY2FuJTIwcGhvdG9ncmFwaGVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuJTIwYWZyaWNhbiUyMHBob3RvZ3JhcGhlcnxlbnwwfHwwfHx8MA%3D%3D",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Camera, number: "2500+", label: "Photos Captured" },
    { icon: Users, number: "150+", label: "Happy Clients" },
    { icon: Award, number: "25+", label: "Awards Won" },
    { icon: Heart, number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="bg-black text-white overflow-hidden cursor-none">
      {/* Custom cursor effect */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Navigation */}
      <Nav></Nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-6 overflow-hidden">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 transform translate-y-0 animate-[slideUp_1s_ease-out]">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                CAPTURING
              </span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MOMENTS
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-[fadeIn_1s_ease-out_0.5s_both]">
            Professional photography that tells your story through stunning
            visuals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-fu animate-[fadeIn_1s_ease-out_1s_both]">
            <a href="#portfolio">
              <button className=" cursor-none group bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                View Portfolio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </a>
            <button className="w-fit cursor-none group border-2 border-white/30 px-12 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Reel
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full animate-[float_8s_ease-in-out_infinite_reverse]" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.portfolio
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A collection of my most cherished captures, each telling a unique
              story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl aspect-square transition-all duration-700 ${
                  isVisible.portfolio
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-xl font-semibold mb-2">
                    Captured Moment
                  </h3>
                  <p className="text-gray-300">
                    Professional photography session
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-transparent to-purple-900/10"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible.about
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                I'm a passionate photographer with over 8 years of experience
                capturing life's most precious moments. My journey began with a
                simple camera and an endless curiosity about the world around
                me.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Today, I specialize in portrait, wedding, and lifestyle
                photography, always striving to create images that not only look
                beautiful but tell meaningful stories.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-purple-600/20 rounded-full text-purple-300 border border-purple-600/30">
                  Portrait Photography
                </span>
                <span className="px-4 py-2 bg-pink-600/20 rounded-full text-pink-300 border border-pink-600/30">
                  Wedding Photography
                </span>
                <span className="px-4 py-2 bg-purple-600/20 rounded-full text-purple-300 border border-purple-600/30">
                  Lifestyle Shoots
                </span>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                Download Resume
              </button>
            </div>
            <div
              className={`relative transition-all duration-1000 ${
                isVisible.about
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1623487906320-9348195f97b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuJTIwYWZyaWNhbiUyMHBob3RvZ3JhcGhlcnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Photographer"
                  className="w-full  rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl -z-10 animate-[float_4s_ease-in-out_infinite]" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full -z-10 animate-[float_6s_ease-in-out_infinite_reverse]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Create Together
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to capture your special moments? Let's discuss your vision
              and bring it to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div
              className={`transition-all duration-1000 ${
                isVisible.contact
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-8">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Email</h3>
                    <p className="text-gray-400">hello@jamesomencha.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Phone</h3>
                    <p className="text-gray-400">0759849050</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  Follow My Journey
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ${
                isVisible.contact
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Project Type"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                />
                <textarea
                  placeholder="Tell me about your project..."
                  rows="6"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none"
                ></textarea>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-gradient-to-t from-purple-900/20 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              JAMES OMENCHA
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 Lens Photography. All rights reserved. Creating memories, one
            frame at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PhotographerLanding;
