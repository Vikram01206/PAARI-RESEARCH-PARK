import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users, Award, FileText, BarChart3, PenTool, Search, MessageCircle } from "lucide-react";

const categories = [
  {
    icon: BookOpen,
    title: "Research Papers",
    description: "Original research papers across all academic disciplines with proper methodology and citations.",
    features: ["Literature Review", "Data Analysis", "APA/MLA/Chicago Formatting", "Plagiarism Check"],
  },
  {
    icon: GraduationCap,
    title: "Thesis & Dissertations",
    description: "End-to-end thesis support from topic selection to defense preparation.",
    features: ["Topic Selection", "Proposal Writing", "Chapter Development", "Revision Support"],
  },
  {
    icon: Users,
    title: "Group Projects",
    description: "Collaborative projects with structured planning, execution, and documentation.",
    features: ["Project Planning", "Task Distribution", "Technical Reports", "Presentation Prep"],
  },
  {
    icon: Award,
    title: "Publication Support",
    description: "Get your research published in reputed peer-reviewed journals.",
    features: ["Journal Selection", "Manuscript Editing", "Response to Reviewers", "Formatting"],
  },
  {
    icon: PenTool,
    title: "Academic Writing",
    description: "Professional academic writing services for essays, reports, and assignments.",
    features: ["Essay Writing", "Lab Reports", "Case Studies", "Critical Analysis"],
  },
  {
    icon: Search,
    title: "Literature Review",
    description: "Comprehensive systematic literature reviews using established frameworks.",
    features: ["Database Search", "PRISMA Framework", "Gap Analysis", "Synthesis"],
  },
  {
    icon: FileText,
    title: "Proposal Writing",
    description: "Compelling research proposals for grants, fellowships, and academic programs.",
    features: ["Grant Proposals", "Fellowship Apps", "Research Design", "Budget Planning"],
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description: "Statistical analysis and visualization using industry-standard tools.",
    features: ["SPSS / R / Python", "Qualitative Analysis", "Data Visualization", "Interpretation"],
  },
];

export default function Services() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive academic research support designed to help you achieve excellence at every stage of your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="skeu-card p-6 group cursor-pointer flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-colors">
                  <cat.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{cat.description}</p>
                <ul className="space-y-1.5 mb-4">
                  {cat.features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="whatsapp" size="sm" className="w-full mt-auto" asChild>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Inquire Now
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
