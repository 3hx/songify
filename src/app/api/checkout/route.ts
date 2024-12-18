import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PRICES } from "@/lib/constants/prices";
import { Song } from "@/stores/song/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { song, currency } = data;

    // Calculate total price in cents for Stripe
    let totalAmount = Math.round(PRICES.basePrice * 100);

    // Convert price to selected currency if not USD
    if (currency && currency.rate && currency.code !== "usd") {
      totalAmount = Math.round(totalAmount * currency.rate);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: song.options.email,
      metadata: {
        songData: JSON.stringify(song),
      },
      line_items: [
        {
          price_data: {
            currency: currency?.code?.toLowerCase() || "usd",
            product_data: {
              name: `Custom Song for ${song.about.name}`,
              description: `${song.tags.genre} song with ${song.tags.vocalStyle} vocals`,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
        // Add rush delivery as separate line item if selected
        ...(song.options.deliveryTime === "rush"
          ? [
              {
                price_data: {
                  currency: currency?.code?.toLowerCase() || "usd",
                  product_data: {
                    name: "Rush Delivery",
                    description: "3-day delivery upgrade",
                  },
                  unit_amount: Math.round(PRICES.rushFee * currency.rate * 100),
                },
                quantity: 1,
              },
            ]
          : []),
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
