export const SHIPPING_FEE = 0;

export function shippingFor(): number {
  return SHIPPING_FEE;
}

const PAYMENT_LINKS: Record<number, string> = {
  200:  "https://t.trklinkx.com/click?pid=4784&offer_id=10936&sub3=Tr",
  999:  "https://t.trklinkx.com/click?pid=4784&offer_id=13179&sub3=Tr",
  1999: "https://t.trklinkx.com/click?pid=4784&offer_id=13057&sub3=Tr",
  4999: "https://t.trklinkx.com/click?pid=4784&offer_id=12355&sub3=Tr",
  7999: "https://t.trklinkx.com/click?pid=4784&offer_id=12541&sub3=Tr",
  9999: "https://t.trklinkx.com/click?pid=4784&offer_id=12913&sub3=Tr",
};

export const hasPaymentLink = true;

export function checkoutHref(quantity: number, amount: number): string {
  return PAYMENT_LINKS[amount] ?? PAYMENT_LINKS[999];
}
