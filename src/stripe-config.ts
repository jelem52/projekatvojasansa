export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_Sv8ic3jpjtueSw',
    priceId: 'price_1RzIQuQpqU47mltbRub6G6De',
    name: 'Tvoja Šansa',
    description: 'Još si samo jedan korak udaljen od početka svog napretka, spreman? Ukoliko želiš drugi vid plaćanja javi nam se u DM na instagram.',
    mode: 'payment',
    price: 11.00,
    currency: 'EUR'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
}

export function getProductById(id: string): StripeProduct | undefined {
  return STRIPE_PRODUCTS.find(product => product.id === id);
}