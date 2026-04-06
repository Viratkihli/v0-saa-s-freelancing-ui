import { GlassCard } from "@/components/ui/glass-card"
import { 
  Brain, 
  CreditCard, 
  MessageSquare, 
  Shield, 
  BarChart3, 
  Globe,
  Zap,
  Users
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithms analyze skills, experience, and project requirements to find perfect matches instantly.",
  },
  {
    icon: Shield,
    title: "Secure Escrow",
    description: "Funds are held securely until milestones are completed. Both parties are protected throughout the project.",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Collaboration",
    description: "Built-in chat, video calls, and file sharing keep your team connected and productive.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Multiple payment methods with automatic invoicing. Get paid faster with instant withdrawals.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track earnings, project progress, and performance metrics with detailed insights.",
  },
  {
    icon: Globe,
    title: "Global Talent Pool",
    description: "Access verified freelancers from 150+ countries. Find the right skills at competitive rates.",
  },
]

const highlights = [
  {
    icon: Zap,
    stat: "5x Faster",
    description: "Project matching compared to traditional platforms",
  },
  {
    icon: Users,
    stat: "92%",
    description: "Of projects completed successfully on first match",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and features designed to make freelancing seamless for both 
            clients and freelancers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <GlassCard key={feature.title} hover className="group">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Highlights */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {highlights.map((highlight) => (
            <GlassCard key={highlight.stat} className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <highlight.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">{highlight.stat}</div>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
