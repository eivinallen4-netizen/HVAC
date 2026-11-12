/**
 * Company-page content. Items marked CONFIRM should be checked with Wave before launch.
 */

export type Offer = { title: string; value: string; text: string; fine: string; icon: "tag" | "gauge" | "unitPlus" | "shield" | "star" };

/** CONFIRM: current specials. These reflect offers already published on Wave's old site — update as promos change. */
export const offers: Offer[] = [
  {
    title: "Wave Club Maintenance Plan",
    value: "$150/yr",
    text: "Two tune-ups a year, priority service, 15% off repairs and upgrades, and extended warranty coverage.",
    fine: "$150/yr first system, $140/yr each additional system. Cancel anytime. See plan details.",
    icon: "gauge",
  },
  {
    title: "Members Save 15% on Repairs",
    value: "15% OFF",
    text: "Wave Club members get 15% off every repair — plus the diagnostic fee waived when the repair is done at the time of service.",
    fine: "Active Wave Club members only.",
    icon: "shield",
  },
  {
    title: "Refer a Friend, Get Rewarded",
    value: "REWARDS",
    text: "Unlimited referrals. Redeem rewards at your next service appointment or choose a gift card.",
    fine: "Reward issued after the referred customer's completed service. CONFIRM current reward amount.",
    icon: "star",
  },
];

/** CONFIRM: referral reward details */
export const referral = {
  headline: "Love Wave? Share Wave.",
  points: [
    { t: "Unlimited referrals", d: "There's no limit to the number of friends, family and neighbors you can refer. The more referrals, the more rewards." },
    { t: "Easy redemption", d: "Redeem rewards at your next service appointment — or choose a gift card, mailed or delivered personally." },
    { t: "Transparent process", d: "Both you and your referral get rewarded promptly. No hoops, no fine-print games." },
  ],
};

export const paymentMethods = ["Cash", "Visa", "Mastercard", "Discover", "American Express", "Financing (with approved credit)"];
