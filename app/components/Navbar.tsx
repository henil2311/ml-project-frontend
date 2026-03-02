"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Analyzer", href: "/analyzer" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 dark:bg-black/50 backdrop-blur-2xl shadow-lg border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent"
        >
          AI Health
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-medium relative">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-3 py-2"
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/analyzer"
              className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white rounded-xl shadow-xl bg-gradient-to-r from-indigo-600 to-cyan-500"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-300 rounded-xl"></span>
              Start Analysis
            </Link>
          </motion.div>
        </div>

        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-200 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 dark:bg-black/80 backdrop-blur-2xl border-t border-white/20 shadow-xl px-6 py-6 space-y-6 text-center"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-lg transition ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/analyzer"
              onClick={() => setMenuOpen(false)}
              className="block bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-3 rounded-xl shadow-lg"
            >
              Start Analysis
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}