import { Layout } from "@/components/Layout";
import { Image as ImageIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Gallery() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <ImageIcon className="h-4 w-4 text-accent" />
              Photo Gallery
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore moments from our seminars, workshops, conferences, and campus activities.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">Gallery Coming Soon</h3>
              <p className="text-muted-foreground text-sm">Photos from our events will appear here soon!</p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((cat) => (
                <div key={cat}>
                  <h2 className="font-display font-bold text-xl text-foreground mb-4">{cat}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items
                      .filter((i) => i.category === cat)
                      .map((item) => (
                        <div key={item.id} className="skeu-card overflow-hidden group">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
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
