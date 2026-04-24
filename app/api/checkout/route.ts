import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const MIN_CENTS = 1;
const MAX_CENTS = 1_000_000;

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_URL) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    let body: { cents?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { cents } = body;

    if (!Number.isInteger(cents) || cents < MIN_CENTS || cents > MAX_CENTS) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: cents,
            product_data: {
              name: "Wasted Money",
              description: "Gone. Just like that.",
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
