import { GlassCard } from "@/components/ui/glass-card"
import { UserPlus, Search, Handshake, BadgeCheck } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and build your profile with skills, portfolio, and preferences. Our AI learns what makes you unique.",
    forClient: "Post your project with requirements, budget, and timeline. Our AI understands exactly what you need.",
  },
  {
    icon: Search,
    step: "02",
    title: "Get AI Matches",
    description: "Receive curated project recommendations based on your expertise and availability. No more endless scrolling.",
    forClient: "Get a shortlist of pre-vetted freelancers ranked by fit. Review profiles, portfolios, and ratings.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Connect & Collaborate",
    description: "Chat with potential clients, discuss requirements, and negotiate terms. Everything in one place.",
    forClient: "Interview candidates, discuss scope, and choose your perfect match. Start working immediately.",
  },
  {
    icon: BadgeCheck,
    step: "04",
    title: "Deliver & Get Paid",
    description: "Complete milestones, submit work, and receive secure payments directly to your account.",
    forClient: "Review deliverables, approve milestones, and release payments. Rate your experience.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How <span className="text-gradient">PrimePath</span> Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A streamlined process that gets you from signup to success in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Freelancer Side */}
                <div className={`${index % 2 === 0 ? "lg:text-right" : "lg:order-2"} mb-8 lg:mb-0`}>
                  <GlassCard hover className="inline-block max-w-md">
                    <div className={`flex items-start gap-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                      <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                        <step.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className={index % 2 === 0 ? "lg:text-right" : ""}>
                        <div className="text-xs font-semibold text-primary mb-1">FOR FREELANCERS</div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Center Step Number */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg z-10" style={{ top: `${index * 25 + 5}%` }}>
                  {step.step}
                </div>

                {/* Client Side */}
                <div className={`${index % 2 === 0 ? "lg:order-2" : ""}`}>
                  <GlassCard hover className="inline-block max-w-md">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                        <step.icon className="w-7 h-7 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-accent mb-1">FOR CLIENTS</div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.forClient}</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
