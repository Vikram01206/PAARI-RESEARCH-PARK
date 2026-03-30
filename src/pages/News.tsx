import { Layout } from "@/components/Layout";
import { Phone, Mail, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    title: "International Conference on Research & Innovation 2026",
    date: "April 15–17, 2026",
    category: "Conference",
    description: "A 3-day international conference covering advanced research methodologies, publication strategies, and academic networking. Open to students and professionals.",
    highlight: true,
  },
  {
    title: "Workshop: How to Publish in Scopus Journals",
    date: "May 5, 2026",
    category: "Workshop",
    description: "Hands-on workshop on structuring papers, selecting journals, and navigating the peer review process for Scopus-indexed publications.",
    highlight: false,
  },
  {
    title: "Free Webinar: Research Gap Identification",
    date: "April 28, 2026",
    category: "Webinar",
    description: "Learn systematic techniques to identify research gaps in your domain using literature review tools and databases.",
    highlight: false,
  },
  {
    title: "Summer Research Bootcamp for Undergraduates",
    date: "June 1–15, 2026",
    category: "Bootcamp",
    description: "Intensive 2-week bootcamp designed for undergraduate students to build research fundamentals and complete a mini-project.",
    highlight: false,
  },
  {
    title: "Seminar: AI in Academic Research",
    date: "May 20, 2026",
    category: "Seminar",
    description: "Explore how artificial intelligence tools are transforming academic research, from literature surveys to data analysis.",
    highlight: false,
  },
  {
    title: "Thesis Writing Masterclass",
    date: "June 10, 2026",
    category: "Workshop",
    description: "A comprehensive masterclass covering thesis structure, methodology writing, results presentation, and defense preparation.",
    highlight: false,
  },
];

const categoryColors: Record<string, string> = {
  Conference: "bg-primary/15 text-primary",
  Workshop: "bg-accent/15 text-accent",
  Webinar: "bg-green-500/15 text-green-700",
  Bootcamp: "bg-orange-500/15 text-orange-700",
  Seminar: "bg-purple-500/15 text-purple-700",
};

export default function News() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((item) => (
              <div
                key={item.title}
                className={`skeu-card p-6 flex flex-col group hover:-translate-y-1 transition-all duration-300 ${
                  item.highlight ? "ring-2 ring-primary/30" : ""
                }`}
              >
                {item.highlight && (
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    ⭐ Featured Event
                  </div>
                )}
                <span className={`self-start px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[item.category] || "bg-secondary text-secondary-foreground"}`}>
                  {item.category}
                </span>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2 leading-snug">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 text-accent" />
                  {item.date}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{item.description}</p>
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <a href="tel:+918610054483">
                      <Phone className="h-4 w-4" />
                      Call Us
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={`mailto:paariresearchpark@gmail.com?subject=${encodeURIComponent(item.title)}`}>
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
