import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/logo.jpeg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="skeu-card w-full max-w-md p-8 text-center bg-white shadow-xl dark:bg-zinc-950">
        <img src={logo} alt="Paari Research Park" className="h-20 w-auto mx-auto mb-6 rounded-xl" />
        <h1 className="mb-2 text-5xl font-display font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
