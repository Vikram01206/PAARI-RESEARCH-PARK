import { Layout } from "@/components/Layout";
import { Phone, Mail, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const categoryColors: Record<string, string> = {
  Conference: "bg-primary/15 text-primary",
  Workshop: "bg-accent/15 text-accent",
  Webinar: "bg-green-500/15 text-green-700",
  Bootcamp: "bg-orange-500/15 text-orange-700",
  Seminar: "bg-purple-500/15 text-purple-700",
  Announcement: "bg-secondary text-secondary-foreground",
};

export default function News() {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Tag className="h-4 w-4 text-accent" />
              Latest Updates
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              News & Announcements
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stay updated with our upcoming conferences, workshops, seminars, and academic events.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">Loading...</div>
          ) : articles.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">No announcements yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((item) => (
                <div key={item.id} className="skeu-card p-6 flex flex-col group hover:-translate-y-1 transition-all duration-300">
                  <span className={`self-start px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[item.category] || "bg-secondary text-secondary-foreground"}`}>
                    {item.category}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 leading-snug">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 text-accent" />
                    {new Date(item.published_at || item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  {item.summary && <p className="text-sm text-muted-foreground leading-relaxed mb-2">{item.summary}</p>}
                  {item.content && <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">{item.content}</p>}
                  <div className="flex gap-2 mt-auto">
                    <Button variant="default" size="sm" className="flex-1" asChild>
                      <a href="tel:+918610054483"><Phone className="h-4 w-4" />Call Us</a>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={`mailto:paariresearchpark@gmail.com?subject=${encodeURIComponent(item.title)}`}><Mail className="h-4 w-4" />Email</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
