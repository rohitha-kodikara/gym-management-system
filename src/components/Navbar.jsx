import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./custom-ui/Button";
import { scrollToSection } from "../utils/scroll";
import { getNavbar } from "@/lib/strapi";

export function Navbar() {
  const {
    data: navbarData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
    staleTime: Infinity,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    scrollToSection(href);
  };

  if (isLoading) return null; // or skeleton
  if (error) return null;

  const {
    NavLink,
    logoBadgeText,
    logoTextPrimary,
    logoTextHighlight,
    loginButtonText,
    signupButtonText,
  } = navbarData ?? {};

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#262626]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dc2626] font-black text-white">
              {logoBadgeText ?? "SK"}
            </span>
            <span className="hidden text-lg font-bold tracking-tight text-white sm:block">
              {logoTextPrimary ?? "Power"}{" "}
              <span className="text-[#dc2626]">
                {logoTextHighlight ?? "Fitness"}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {NavLink?.map((link) => (
              <li key={link.href}>
                <a
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="relative text-sm font-medium text-[#a3a3a3] transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#dc2626] transition-all duration-300 hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              className="border border-white/40 hover:border-white"
            >
              {loginButtonText ?? "Login"}
            </Button>
            <Button animate size="sm">
              {signupButtonText ?? "Sign Up"}
            </Button>
          </div>

          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-lg lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col items-center justify-center gap-6 px-6"
            >
              {NavLink?.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="text-2xl font-bold text-white transition-colors hover:text-[#dc2626]"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
                <Button variant="secondary" className="w-full">
                  {loginButtonText ?? "Login"}
                </Button>
                <Button className="w-full">
                  {signupButtonText ?? "Sign Up"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
