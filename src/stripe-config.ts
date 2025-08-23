export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

export const products: Product[] = [
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

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};