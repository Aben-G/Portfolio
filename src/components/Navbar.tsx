import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeHref, setActiveHref] = useState<string>("#home");

  const sectionIds = useMemo(() => links.map((l) => l.href.replace(/^#/, "")), []);

  const scrollToHash = useCallback((hash: string) => {
    const id = hash.replace(/^#/, "");
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    // Let the route render first (especially when navigating from /admin -> /#section)
    const t = window.setTimeout(() => scrollToHash(location.hash), 0);
    return () => window.clearTimeout(t);
  }, [location.hash, scrollToHash]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    if (location.hash && links.some((l) => l.href === location.hash)) {
      setActiveHref(location.hash);
    } else {
      setActiveHref("#home");
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0];
        const id = top?.target?.id;
        if (!id) return;

        const href = `#${id}`;
        if (links.some((l) => l.href === href)) setActiveHref(href);
      },
      {
        root: null,
        // Treat a section as active when it's near the top/middle.
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname, sectionIds]);

  const handleNavClick = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setOpen(false);
      setActiveHref(href);

      // If we're not on the landing page, navigate there with the hash.
      if (location.pathname !== "/") {
        navigate(`/${href}`);
        return;
      }

      // Keep the URL in sync but scroll explicitly (handles clicking same hash repeatedly).
      window.history.pushState(null, "", href);
      scrollToHash(href);
    },
    [location.pathname, navigate, scrollToHash],
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#home"
          onClick={handleNavClick("#home")}
          className="font-heading text-xl font-bold text-gradient"
        >
          AG
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={handleNavClick(l.href)}
              aria-current={activeHref === l.href ? "true" : undefined}
              className={
                activeHref === l.href
                  ? "text-sm font-semibold text-primary transition-colors duration-200"
                  : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={handleNavClick(l.href)}
                  aria-current={activeHref === l.href ? "true" : undefined}
                  className={
                    activeHref === l.href
                      ? "text-sm font-semibold text-primary transition-colors"
                      : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
