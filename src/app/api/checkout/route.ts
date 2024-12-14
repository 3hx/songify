import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        songData: JSON.stringify(formData),
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Custom Song for ${formData.about.name}`,
              description: `${formData.tags.genre} song with ${formData.tags.vocalStyle} vocals`,
            },
            unit_amount: 19999, // $199.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
