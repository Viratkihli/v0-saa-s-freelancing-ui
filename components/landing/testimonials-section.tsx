import { GlassCard } from "@/components/ui/glass-card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    avatar: "SC",
    content: "PrimePath transformed my freelance career. The AI matching is incredibly accurate - I only get projects that truly fit my skills. My income has doubled in 6 months.",
    rating: 5,
    earnings: "$85,000+",
  },
  {
    name: "Marcus Johnson",
    role: "Startup Founder",
    avatar: "MJ",
    content: "Finding quality developers used to take weeks. With PrimePath, I found the perfect team in 48 hours. The escrow system gives me complete peace of mind.",
    rating: 5,
    projects: "12 Completed",
  },
  {
    name: "Elena Rodriguez",
    role: "UI/UX Designer",
    avatar: "ER",
    content: "The platform is beautifully designed and the collaboration tools are fantastic. Real-time feedback and seamless payments make every project a joy.",
    rating: 5,
    earnings: "$62,000+",
  },
  {
    name: "David Park",
    role: "Product Manager",
    avatar: "DP",
    content: "We&apos;ve built our entire remote team through PrimePath. The quality of talent is exceptional, and the platform makes managing contracts effortless.",
    rating: 5,
    projects: "25+ Hires",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Loved by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community of successful freelancers and satisfied clients.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <GlassCard key={testimonial.name} hover className="relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                {`"${testimonial.content}"`}
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gradient">
                    {testimonial.earnings || testimonial.projects}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
