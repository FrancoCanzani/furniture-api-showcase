import { atom } from 'jotai';
import { Product } from './api';

interface CartItem {
  product: Product;
  quantity: number;
}

export const cartAtom = atom<CartItem[]>([]);

export const addToCart = (product: Product, quantity: number = 1) => {
  cartAtom.set((prev) => {
    const existingItem = prev.find((item) => item.product.sku === product.sku);
    if (existingItem) {
      return prev.map((item) =>
        item.product.sku === product.sku
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }
    return [...prev, { product, quantity }];
  });
};