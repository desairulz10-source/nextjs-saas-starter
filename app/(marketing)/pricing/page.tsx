import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Pricing - SaaS Starter',
  description: 'Simple, transparent pricing for your business.',
};

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for side projects',
      features: ['1 team', '3 projects', 'Community support', 'Basic analytics'],
      cta: 'Get Started',
      href: '/login',
    },
    {
      name: 'Starter',
      price: '$19',
      description: 'For growing businesses',
      features: [
        '5 teams',
        'Unlimited projects',
        'Email support',
        'Custom domains',
        'API access',
      ],
      cta: 'Start Trial',
      href: '/login',
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For professional teams',
      features: [
        'Unlimited teams',
        'SSO authentication',
        'Priority support',
        'Advanced analytics',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      href: '/login',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="font-bold text-xl">
            SaaS Starter
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? 'border-primary shadow-lg' : ''}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button
                      className="w-full"
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
