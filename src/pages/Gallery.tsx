import { Layout } from "@/components/Layout";
import { ImageIcon } from "lucide-react";

const placeholders = [
  { label: "Seminar Photos", count: "Coming Soon" },
  { label: "Workshop Highlights", count: "Coming Soon" },
  { label: "Project Showcases", count: "Coming Soon" },
  { label: "Conference Moments", count: "Coming Soon" },
  { label: "Campus & Lab", count: "Coming Soon" },
  { label: "Team & Faculty", count: "Coming Soon" },
];

export default function Gallery() {
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
              Explore moments from our seminars, workshops, and research activities. More photos coming soon!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholders.map((item) => (
              <div
                key={item.label}
                className="skeu-card group overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-secondary/50 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                    <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-secondary/80 px-3 py-1 rounded-full">
                    {item.count}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-display font-semibold text-foreground">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
