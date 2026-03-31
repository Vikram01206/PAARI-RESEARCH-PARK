import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Newspaper, Image, LayoutDashboard } from "lucide-react";
import { AdminEvents } from "@/components/admin/AdminEvents";
import { AdminNews } from "@/components/admin/AdminNews";
import { AdminGallery } from "@/components/admin/AdminGallery";
import logo from "@/assets/logo.jpeg";

const tabs = [
  { id: "events", label: "Events & Calendar", icon: Calendar },
  { id: "news", label: "News & Announcements", icon: Newspaper },
  { id: "gallery", label: "Gallery", icon: Image },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("events");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Paari Research Park" className="h-8 w-auto rounded-lg" />
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-lg text-foreground">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {activeTab === "events" && <AdminEvents />}
        {activeTab === "news" && <AdminNews />}
        {activeTab === "gallery" && <AdminGallery />}
      </div>
    </div>
  );
}
