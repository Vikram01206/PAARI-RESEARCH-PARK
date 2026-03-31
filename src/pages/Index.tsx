import { Layout } from "@/components/Layout";
import { EventPopup } from "@/components/EventPopup";
import { Button } from "@/components/ui/button";
import { Phone, Mail, BookOpen, GraduationCap, Users, Award, ArrowRight, Star, FileText, BarChart3, Lightbulb } from "lucide-react";

const stats = [
  { value: "100+", label: "Research Projects Completed", icon: FileText },
  { value: "150+", label: "Students Helped", icon: GraduationCap },
  { value: "95%", label: "Success Rate", icon: BarChart3 },
  { value: "15+", label: "Research Domains", icon: Lightbulb },
];

const services = [
  {
    icon: BookOpen,
    title: "Research Papers",
    description: "High-quality research papers with proper methodology, citations, and analysis across all academic disciplines.",
  },
  {
    icon: GraduationCap,
    title: "Thesis & Dissertations",
    description: "Comprehensive thesis support from topic selection to final submission, ensuring academic excellence.",
  },
  {
    icon: Users,
    title: "Group Projects",
    description: "Collaborative project development with structured deliverables and professional documentation.",
  },
  {
    icon: Award,
    title: "Publication Support",
    description: "Get your research published in reputed journals with our expert editing and formatting assistance.",
  },
];

const testimonials = [
  {
    name: "M. Manish",
    role: "Independent researcher",
    text: "Paari Research Park helped me structure my dissertation perfectly. The quality was outstanding and they met every deadline.",
    rating: 5,
  },
  {
    name: "A. Muhil",
    role: "Independent researcher",
    text: "Incredible service! They understood my research topic deeply and delivered a paper that exceeded expectations.",
    rating: 5,
  },
  {
    name: "D. Bhuvanesh",
    role: "Independent researcher",
    text: "Fast, reliable, and professional. My project stood out among all submissions thanks to Paari Research Park.",
    rating: 5,
  },
];

export default function Index() {
  return (
    <Layout>
      <EventPopup />
      {/* HERO */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-accent/15 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6 skeu-button">
                <Award className="h-4 w-4 text-accent" />
                Trusted by 1000+ Students Worldwide
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground mb-6">
                Elevate Your <span className="text-gradient">Academic Research</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
                Professional research assistance for students and academics. From papers to dissertations — we deliver excellence that gets results.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" size="lg" asChild>
                  <a href="tel:+918610054483">
                    <Phone className="h-5 w-5" />
                    Call Us
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:paariresearchpark@gmail.com">
                    <Mail className="h-5 w-5" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>

            {/* Right — stacked skeuomorphic cards */}
            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="skeu-card p-6 absolute top-0 right-0 w-72 animate-float">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Research Paper</div>
                    <div className="text-xs text-muted-foreground">Machine Learning</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-accent"></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">80% Complete</div>
              </div>

              <div className="skeu-card p-6 absolute top-32 left-0 w-64 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">PhD Thesis</div>
                    <div className="text-xs text-muted-foreground">Neuroscience</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-3/5 rounded-full bg-primary"></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">60% Complete</div>
              </div>

              <div className="skeu-card p-6 absolute top-64 right-8 w-60 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">"Outstanding quality and delivery!"</p>
                <p className="text-xs font-medium text-foreground mt-1">— M. Manish, Independent researcher</p>
              </div>

              {/* Spacer to reserve height */}
              <div className="h-[400px]" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="skeu-card p-6 text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive academic support tailored to your needs — from initial research to final submission.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="skeu-card p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/25 transition-colors">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-secondary/50">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">What Students Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hear from students who transformed their academic journey with our help.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="skeu-card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="skeu-card p-10 md:p-16 text-center bg-primary text-primary-foreground border-none">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Start Your Research Journey Today</h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
              Join hundreds of students who have achieved academic success with our professional research support.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="default" size="lg" asChild>
                <a href="tel:+918610054483">
                  <Phone className="h-5 w-5" />
                  Call Us
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:text-primary-foreground">
                <a href="mailto:paariresearchpark@gmail.com">
                  <Mail className="h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
