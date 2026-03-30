import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <a
        href="https://wa.me/918610054483"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground flex items-center justify-center skeu-button"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
