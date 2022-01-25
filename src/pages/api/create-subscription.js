import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY);

export default async function createSubscription(req, res) {
  if (req.method !== "POST") {
    return res.status(404).send();
  }

  const { priceId, customerId } = req.body;

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    return res.json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
}
