const baseURL = 'https://furniture-api.fly.dev/v1';

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

interface GetProductsParams {
  limit: number;
  offset: number;
  name?: string;
  sort?:
    | 'price_asc'
    | 'price_desc'
    | 'name_asc'
    | 'name_desc'
    | 'newest'
    | 'oldest';
}

export async function getProducts({
  limit,
  offset = 0,
  name,
  sort = 'newest',
}: GetProductsParams): Promise<ProductsResponse> {
  try {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);

    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      sort,
    });

    if (name?.trim()) {
      params.append('name', name.trim());
    }

    const response = await fetch(`${baseURL}/products?${params.toString()}`, {
      signal: abortController.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch products');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function getProduct(sku: string): Promise<Product> {
  try {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);

    const response = await fetch(`${baseURL}/products/${sku}`, {
      signal: abortController.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch product');
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

export const getRelatedProducts = async (
  category: string,
  currentSku: string
) => {
  try {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);

    const response = await fetch(
      `${baseURL}/products?category=${category}&limit=9`,
      {
        signal: abortController.signal,
        headers: {
          Accept: 'application/json',
        },
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch product');
    }

    return data.data.filter((product: Product) => product.sku !== currentSku);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};
