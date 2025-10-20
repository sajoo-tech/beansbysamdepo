export interface OrderItem {
  id: string;
  product: string;
  weight: string;
  quantity: number;
  grindType: string;
}

export interface LabelData {
  recipientInfo: string;
  items: OrderItem[];
}

export const PRODUCTS = [
  'Sıcak Çikolata',
  'Hot Chocolate',
  'Uganda Bigusi',
  'Peru Papagayo',
  'Ethiopia Sidamo',
  'Guatemala Antigua',
  'Turkish Coffee',
  'Special Espresso Blend',
  'Costa Rica Terrazú',
  'Honduras',
  'Sumatra Blue Batak',
  'Signature Filter Blend',
  'Sams Salep',
  'Sams Chai Tea Latte',
  'Sıcak Keyif Serisi',
  'Tanışma Paketi'
] as const;

export const GRIND_TYPES = [
  'Çekirdek',
  'Öğütülmüş Espresso',
  'Mocha Pot',
  'Filtre Kahve',
  'V60',
  'Chemex',
  'French Press'
] as const;
