import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";

const projects = [
  { title: "AI-Driven Crop Disease Detection", domain: "Machine Learning", description: "Developed a CNN-based model to detect crop diseases from leaf images with 96% accuracy." },
  { title: "Blockchain-Based Voting System", domain: "Cybersecurity", description: "Decentralized e-voting platform ensuring transparency and tamper-proof election results." },
  { title: "Mental Health Chatbot", domain: "NLP / Healthcare", description: "An NLP-powered chatbot providing preliminary mental health assessments and resources." },
  { title: "Smart Traffic Management", domain: "IoT", description: "IoT-based real-time traffic monitoring and signal optimization system for urban areas." },
  { title: "E-Commerce Recommendation Engine", domain: "Data Science", description: "Collaborative filtering recommendation system increasing user engagement by 40%." },
  { title: "Renewable Energy Forecasting", domain: "Environmental Science", description: "Time-series prediction model for solar and wind energy output using weather data." },
  { title: "Sentiment Analysis of News Media", domain: "NLP", description: "Multi-language sentiment analyzer for real-time news article classification." },
  { title: "Automated Essay Grading", domain: "EdTech", description: "ML-based essay evaluation system achieving 0.85 correlation with human graders." },
  { title: "Patient Readmission Prediction", domain: "Healthcare Analytics", description: "Predictive model identifying high-risk patients to reduce hospital readmission rates." },
];

export default function Projects() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-4">Our Projects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A showcase of research projects we've delivered across diverse academic domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="skeu-card p-6 group relative overflow-hidden flex flex-col">
                <span className="inline-block self-start px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium mb-3">
                  {project.domain}
                </span>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{project.description}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://wa.me/918610054483" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View Details
                  </a>
                </Button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                  <p className="text-primary-foreground font-display font-semibold text-lg mb-4">Interested?</p>
                  <Button variant="whatsapp" size="sm" asChild>
                    <a href="https://wa.me/918610054483" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      Inquire Now
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
