import { useState, useEffect } from "react";
import { X, MessageCircle, Mail, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

export function EventPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="skeu-card w-full max-w-lg overflow-hidden relative">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header banner */}
        <div className="bg-primary px-6 py-5 text-primary-foreground">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="Paari Research Park" className="h-10 w-10 rounded-lg border border-primary-foreground/20" />
            <div>
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Paari Research Park Presents</p>
              <h2 className="text-lg font-display font-bold">Upcoming Seminar 2026</h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <h3 className="font-display font-bold text-xl text-foreground">
            International Conference on Research & Innovation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Join leading researchers and academics for an intensive workshop on advanced research methodologies, publication strategies, and emerging trends across multiple domains.
          </p>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span>April 15 – 17, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Virtual + On-site (Chennai, India)</span>
            </div>
          </div>

          <div className="skeu-card bg-accent/5 p-3 border-accent/20">
            <p className="text-xs font-medium text-accent">🎓 Early Bird Registration Open — Limited Seats!</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="default" size="lg" className="flex-1" asChild>
              <a href="tel:+918610054483">
                <Phone className="h-5 w-5" />
                Call to Register
              </a>
            </Button>
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <a href="mailto:paariresearchpark@gmail.com?subject=Seminar%20Registration">
                <Mail className="h-5 w-5" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
