/**
 * Company-page content. Items marked CONFIRM should be checked with Wave before launch.
 */

export type Offer = { title: string; value: string; text: string; fine: string; icon: "tag" | "gauge" | "unitPlus" | "shield" | "star" };

/** Current offers. Wave has no maintenance membership and no discount pricing — the referral program is the standing offer. */
export const offers: Offer[] = [
  {
    title: "Refer a Friend, Get Rewarded",
    value: "REWARDS",
    text: "Unlimited referrals. You and the friend you refer both get rewarded — redeem at a service appointment or get a gift card, mailed or delivered personally.",
    fine: "Call (702) 881-4713 for current reward details.",
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
