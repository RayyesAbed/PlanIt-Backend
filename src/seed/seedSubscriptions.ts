import Subscription from "../schemas/Subscription";

const seedSubscriptions = async () => {
  const plans = [
    {
      name: "Free",
      features: [
        "Up to 2 Stories",
        "Up to 5 Projects",
        "Only birthday and occasions theme, badge, XPs, and stories offers",
      ],
      price: 0,
      currency: "EUR",
    },
    {
      name: "Premium",
      features: [
        "No Ads",
        "Up to 10 Stories",
        "Up to 25 Projects",
        "Monthly theme, badge, XPs, and stories offers",
        "Integration with: (Google Calendar, Apple Calendar)",
      ],
      price: 4.99,
      currency: "EUR",
    },
    {
      name: "Ultimate",
      features: [
        "No Ads",
        "Unlimited Stories",
        "Unlimited Projects",
        "Weekly theme, badge, XPs, and stories offers",
        "Integration with: (Google Calendar, Apple Calendar)",
      ],
      price: 9.99,
      currency: "EUR",
    },
  ];

  for (const plan of plans) {
    await Subscription.findOneAndUpdate({ name: plan.name }, plan, {
      upsert: true,
      new: true,
    });
  }

  console.log("Subscriptions seeded");
};

export default seedSubscriptions;
