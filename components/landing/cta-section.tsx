import Link from "next/link"
import { GradientButton } from "@/components/ui/gradient-button"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  "No credit card required",
  "Free to join for freelancers",
  "Cancel anytime",
]

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
          Ready to Transform Your <span className="text-gradient">Freelance Journey?</span>
        </h2>
        
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Join thousands of freelancers and clients who have found success with PrimePath. 
          Start your free trial today and experience the future of work.
        </p>

        {/* Benefits */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup?role=freelancer">
            <GradientButton size="lg" className="group">
              Join as Freelancer
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GradientButton>
          </Link>
          <Link href="/signup?role=client">
            <GradientButton variant="outline" size="lg" className="group">
              Hire Talent
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
