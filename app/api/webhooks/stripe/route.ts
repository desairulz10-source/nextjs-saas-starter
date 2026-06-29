import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prisma.subscription.upsert({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      create: {
        userId: session.metadata?.userId || '',
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        status: subscription.status as any,
        plan: 'PRO',
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        status: subscription.status as any,
      },
    });
  }

  if (event.type === 'invoice.payment_failed') {
    await prisma.subscription.updateMany({
      where: {
        stripeCustomerId: session.customer as string,
      },
      data: {
        status: 'PAST_DUE',
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
