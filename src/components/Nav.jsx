import { useState } from "react";
import { Camera, Menu, X } from "lucide-react";
import { Link } from "react-router";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Camera className="w-8 h-8 text-purple-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            JAMES OMENCHA
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#home"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#portfolio"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Portfolio
          </a>
          <a
            href="#about"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Desktop Book Session Button */}
        <div className="hidden md:block">
          <Link>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              Book Session
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <a
              href="#home"
              onClick={closeMenu}
              className="block py-2 hover:text-purple-400 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#portfolio"
              onClick={closeMenu}
              className="block py-2 hover:text-purple-400 transition-colors duration-300"
            >
              Portfolio
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="block py-2 hover:text-purple-400 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="block py-2 hover:text-purple-400 transition-colors duration-300"
            >
              Contact
            </a>
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={closeMenu}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
