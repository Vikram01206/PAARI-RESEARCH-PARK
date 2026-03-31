import { Layout } from "@/components/Layout";
import { Calendar as CalendarIcon, Clock, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const typeColors: Record<string, string> = {
  Conference: "bg-primary text-primary-foreground",
  Workshop: "bg-accent text-accent-foreground",
  Webinar: "bg-green-600 text-white",
  Bootcamp: "bg-orange-500 text-white",
  Seminar: "bg-purple-600 text-white",
};

export default function Events() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("date");
      if (error) throw error;
      return data;
    },
  });

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const monthEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const handlePrev = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const handleNext = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <CalendarIcon className="h-4 w-4 text-accent" />
              Event Calendar
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Upcoming Events
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our calendar of seminars, workshops, conferences, and academic activities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 skeu-card p-6">
              <div className="flex items-center justify-between mb-6">
                <button onClick={handlePrev} className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">← Prev</button>
                <h2 className="font-display font-bold text-xl text-foreground">{months[currentMonth]} {currentYear}</h2>
                <button onClick={handleNext} className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">Next →</button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (<div key={`empty-${i}`} className="h-14" />))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const hasEvents = dayEvents.length > 0;
                  return (
                    <div key={day} className={`h-14 rounded-lg flex flex-col items-center justify-center text-sm transition-colors ${hasEvents ? "bg-primary/10 text-primary font-bold ring-1 ring-primary/20" : "hover:bg-secondary/50"}`}>
                      {day}
                      {hasEvents && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dayEvents.map((_, idx) => (<div key={idx} className="w-1.5 h-1.5 rounded-full bg-primary" />))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-foreground mb-2">Events in {months[currentMonth]}</h3>
              {monthEvents.length === 0 ? (
                <div className="skeu-card p-6 text-center text-muted-foreground text-sm">No events this month.</div>
              ) : (
                monthEvents.map((event) => (
                  <div key={event.id} className="skeu-card p-4 hover:-translate-y-0.5 transition-all duration-200">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${typeColors[event.type] || "bg-secondary text-secondary-foreground"}`}>{event.type}</span>
                    <h4 className="font-semibold text-sm text-foreground mb-2 leading-snug">{event.title}</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><CalendarIcon className="h-3 w-3" />{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                      {event.time && <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{event.time}</div>}
                      {event.location && <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{event.location}</div>}
                    </div>
                    <Button variant="default" size="sm" className="w-full mt-3" asChild>
                      <a href={`mailto:paariresearchpark@gmail.com?subject=Register%20for%20${encodeURIComponent(event.title)}`}><Mail className="h-4 w-4" />Register</a>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
