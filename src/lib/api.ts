import axios from 'axios';

const api = axios.create({
  baseURL: 'https://furniture-api.fly.dev/v1',
});

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  wood_type: string;
  finish: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  price: number;
  weight: number;
  image_path: string;
  stock: number;
  sku: string;
  status: 'active' | 'inactive';
  featured: boolean;
  discount_price?: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  count: number;
}

export const getProducts = async ({ pageParam = 0 }) => {
  const { data } = await api.get<ProductsResponse>('/products', {
    params: { 
      limit: 12,
      offset: pageParam * 12 
    },
  });
  return data;
};

export const getProduct = async (sku: string) => {
  const { data } = await api.get<{ success: boolean; data: Product }>(`/products/${sku}`);
  return data.data;
};

export const getRelatedProducts = async (category: string, currentSku: string) => {
  const { data } = await api.get<ProductsResponse>('/products', {
    params: { category, limit: 4 },
  });
  return data.data.filter(product => product.sku !== currentSku);
};