import { Link } from "react-router-dom";
import { MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="font-display font-bold text-lg">R</span>
              </div>
              <span className="font-display font-bold text-xl">ResearchHub</span>
            </div>
            <p className="text-primary-foreground/70 max-w-sm text-sm leading-relaxed">
              Your trusted partner for academic research, thesis writing, and project development. Empowering students and professionals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Services", "Projects", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/1234567890"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href="mailto:info@researchhub.com"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                <Mail className="h-4 w-4" /> info@researchhub.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} ResearchHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
