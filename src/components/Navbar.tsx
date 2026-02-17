import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onJoinClick: () => void;
}

export const LingoPulseLogo = ({
  className = "w-10 h-10",
}: {
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-blue-violet rounded-xl border-2 border-black rotate-3 shadow-[2px_2px_0px_0px_#000]"></div>
    <div className="absolute inset-0 bg-daisy-white rounded-xl border-2 border-black flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 40 40" className="w-full h-full p-1.5">
        <path
          d="M5 20 H12 L15 10 L18 30 L21 15 L23 20 H35"
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 20 H12 L15 10 L18 30 L21 15 L23 20 H35"
          fill="none"
          stroke="#FF611E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />
      </svg>
    </div>
  </div>
);

const Navbar = ({ onJoinClick }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const navLinks = [
    { name: "How It Works", path: "#how-it-works" },
    { name: "Features", path: "#features" },
    { name: "Who's it for?", path: "#why-it-matters" },
    { name: "FAQ", path: "#faq" },
  ];

  const languages = ["EN", "FR", "ES", "DE", "ZH"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-2 py-8 md:px-6 font-satoshi">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] px-1 py-4 flex items-center justify-between ">
          {/* Logo / Left Side */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <LingoPulseLogo className="w-10 h-10 group-hover:rotate-6 transition-transform duration-300" />
            <span className="text-[25px] font-bold font-space-grotesk tracking-tighter text-dark-space">
              lingopulse
            </span>
          </Link>

          {/* Center Links (Simple) */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="font-bold text-[#031926] hover:text-blue-violet transition-colors text-[20px] font-space-grotesk"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side (Important) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 font-bold text-dark-space hover:bg-black/5 px-3 py-2 rounded-xl transition-colors border-2 border-transparent active:border-black font-space-grotesk"
              >
                <span className="text-xl">🌐</span>
                <span className="text-[20px]">{currentLang}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 bg-white border-2 border-black rounded-2xl p-2 shadow-[4px_4px_0px_0px_#000] min-w-[120px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setIsLangOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 font-bold hover:bg-blue-violet hover:text-white rounded-lg transition-colors"
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Join Now Button */}
            <button
              onClick={onJoinClick}
              className="btn-neubrutalism text-[20px] px-8 py-3 font-space-grotesk"
            >
              Join Now <span className="ml-2">›</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2  rounded-2xl hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-daisy-white  z-50 p-8 "
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <LingoPulseLogo className="w-10 h-10" />
                    <span className="text-2xl font-bold font-space-grotesk tracking-tighter">
                      Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 border-4 border-black rounded-2xl hover:bg-black/5"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-bold font-space-grotesk hover:text-blue-violet transition-colors flex items-center justify-between"
                    >
                      {link.name}
                      <span className="text-blue-violet">›</span>
                    </a>
                  ))}

                  <div className="h-0.5 bg-black/10 my-4"></div>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onJoinClick();
                    }}
                    className="text-2xl font-bold hover:text-blue-violet text-left"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onJoinClick();
                    }}
                    className="relative inline-flex items-center justify-center py-5 mt-4 group w-full"
                  >
                    <div className="absolute inset-0 bg-black rounded-full translate-x-1 translate-y-1"></div>
                    <div className="absolute inset-0 bg-blue-violet border-2 border-black rounded-full"></div>
                    <span className="relative text-white font-bold text-xl flex items-center gap-2">
                      Join Now <span className="text-2xl">›</span>
                    </span>
                  </button>
                </div>

                <div className="mt-auto pt-10 flex items-center gap-4">
                  <span className="text-xl">🌐</span>
                  <div className="flex gap-3">
                    {languages.map((l) => (
                      <button
                        key={l}
                        className="font-bold text-sm bg-black/5 px-2 py-1 rounded-md"
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
