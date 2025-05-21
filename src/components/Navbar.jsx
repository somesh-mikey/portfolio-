import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const isScrollingRef = useRef(false);

  // Listen to scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      let found = false;
      for (let i = 0; i < NAV_SECTIONS.length; i++) {
        const sectionId = NAV_SECTIONS[i].id;
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Section is considered active if its top is above 120px and its bottom is below 120px
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            found = true;
            break;
          }
        }
      }
      // If no section is found (scrolled past last), set last as active
      if (!found) {
        setActiveSection(NAV_SECTIONS[NAV_SECTIONS.length - 1].id);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle nav click: scroll to section and set active
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);
    isScrollingRef.current = true;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <nav
      className="w-full h-16 flex flex-row justify-between items-center xl:px-36 lg:px-24 md:px-12 sm:px-6 px-4 fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-[100]"
      style={{ minHeight: "56px" }}
    >
      {/* Logo and Theme Toggle */}
      <div className="flex items-center gap-x-4">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="md:text-2xl sm:text-xl text-lg font-bold text-yellow-500 tracking-wide"
          style={{ letterSpacing: "0.04em" }}
        >
          Somesh Das
        </a>
      </div>
      {/* Navigation Links */}
      <div className="flex items-center">
        {NAV_SECTIONS.map((section, idx) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleNavClick(e, section.id)}
            className={`group lg:text-lg md:text-base text-sm font-light tracking-wide relative mx-3 px-1 transition-colors duration-200 ${activeSection === section.id
              ? "text-red-500 dark:text-yellow-500"
              : "text-gray-600 dark:text-white"
              }`}
            style={{ letterSpacing: "0.02em" }}
          >
            {section.label}
            <span
              className={`absolute -bottom-1 left-0 w-full h-[2px] rounded bg-gray-600 dark:bg-white transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left origin-right transition-transform duration-300 ${activeSection === section.id
                ? "bg-red-500 dark:bg-yellow-500 scale-x-100"
                : "bg-gray-600 dark:bg-white scale-x-0"
                }`}
            ></span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
