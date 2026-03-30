import { Layout } from "@/components/Layout";
import { Target, Eye, Shield, Clock, Users, Award } from "lucide-react";

const values = [
  { icon: Shield, title: "Academic Integrity", description: "We uphold the highest standards of originality and ethical research practices." },
  { icon: Clock, title: "Timely Delivery", description: "Every project is delivered on schedule — because deadlines matter." },
  { icon: Users, title: "Expert Team", description: "PhD-qualified researchers and domain experts across 50+ disciplines." },
  { icon: Award, title: "Quality Guaranteed", description: "Rigorous quality checks, plagiarism scans, and unlimited revisions." },
];

export default function About() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">About ResearchHub</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We are a team of passionate researchers, writers, and academics committed to helping students achieve their full potential.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="skeu-card p-8">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to high-quality academic research support, empowering students and professionals worldwide to produce impactful, original work that advances knowledge.
              </p>
            </div>
            <div className="skeu-card p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the world's most trusted research partner — a platform where academic excellence meets accessibility, and every student has the tools to succeed.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="skeu-card p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
