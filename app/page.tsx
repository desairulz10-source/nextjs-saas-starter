import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">SaaS Starter</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </nav>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="space-y-8 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Launch Your SaaS Business in{' '}
            <span className="text-primary">Hours, Not Months</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A production-ready boilerplate with authentication, teams, billing, and
            everything you need to start building your business today.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/desairulz10-source/nextjs-saas-starter" target="_blank">
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Everything You Need</h2>
            <p className="text-muted-foreground mt-4">
              Built with modern technologies for serious businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Lightning Fast"
              description="Next.js 14 with App Router, Server Actions, and edge runtime support."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Enterprise Security"
              description="OAuth 2.0, role-based access control, and audit logging built-in."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-500" />}
              title="Team Collaboration"
              description="Multi-tenant teams, project management, and member invitations."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Simple Pricing</h2>
            <p className="text-muted-foreground mt-4">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Free"
              price="$0"
              description="Perfect for side projects"
              features={['1 team', '3 projects', 'Community support']}
              href="/login"
            />
            <PricingCard
              name="Starter"
              price="$19"
              description="For growing businesses"
              features={['5 teams', 'Unlimited projects', 'Email support', 'Custom domains']}
              href="/login"
              highlighted
            />
            <PricingCard
              name="Pro"
              price="$49"
              description="For professional teams"
              features={['Unlimited teams', 'SSO', 'Priority support', 'API access']}
              href="/login"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 SaaS Starter. Built with Next.js.
          </p>
          <div className="flex space-x-4">
            <Link href="https://github.com/desairulz10-source" className="text-sm text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  href,
  highlighted = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  href: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`flex flex-col p-6 rounded-lg border ${highlighted ? 'border-primary shadow-lg' : ''}`}>
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground ml-2">/month</span>
      </div>
      <p className="text-muted-foreground mt-2">{description}</p>
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href} className="mt-6">
        <Button className="w-full" variant={highlighted ? 'default' : 'outline'}>
          Get Started
        </Button>
      </Link>
    </div>
  );
}
