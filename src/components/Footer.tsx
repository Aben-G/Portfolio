const Footer = () => (
  <footer className="border-t border-border py-12 px-6 text-center">
    <div className="mb-6">
      <a href="#home" className="font-heading text-2xl font-bold text-gradient">
        AG
      </a>
    </div>
    <p className="text-xs text-muted-foreground">
      © {new Date().getFullYear()} Abenezer Gezahegn. All rights reserved.
    </p>
  </footer>
);

export default Footer;
