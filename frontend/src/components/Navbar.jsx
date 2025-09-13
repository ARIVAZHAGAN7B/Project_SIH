import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ logo, title, userAvatar, onHelpClick, className = "" }) => {
  const [scrolled, setScrolled] = useState(false);

  // 👇 define navItems here
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/kolam-generator", label: "Generator" },
    { path: "/redraw-kolam", label: "Redraw" },
    { path: "/kolam-gallery", label: "Gallery" },
    { path: "/pattern-recognition", label: "Pattern" },
    { path: "/rule-extraction", label: "Rules" },
    { path: "/kolam-analysis", label: "Analysis" },
    { path: "/about", label: "About" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--secondary-color)] px-10 py-3 transition-colors duration-300 mb-10 ${
        scrolled
          ? "bg-[var(--background-color)]/70 backdrop-blur-sm"
          : "bg-transparent"
      } ${className}`}
    >
      {/* Logo + Title */}
      <Link to="/">
      <div className="flex items-center gap-4">
        <div className="text-[var(--primary-color)]">
          {typeof logo === "string" ? (
            <img
              src={logo}
              alt="Logo"
              className="h-[5em] w-auto object-contain"
            />
          ) : (
            logo
          )}
        </div>
        <h2 className="text-xl font-bold tracking-[-0.015em]">{title}</h2>
      </div>
      </Link>

      {/* Nav Items */}
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors hover:text-[var(--text-color)] ${
                  isActive
                    ? "text-[var(--text-color)] font-bold"
                    : "text-[var(--subtle-text-color)]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="h-6 w-px bg-[var(--secondary-color)]"></div>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="size-10 overflow-hidden rounded-full">
            <img
              alt="User avatar"
              className="size-full object-cover"
              src={userAvatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
