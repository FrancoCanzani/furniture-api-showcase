import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/product';
import HomePage from './pages/home';
import { CartProvider } from './lib/cart-provider';
import SearchPage from './pages/search';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:sku' element={<ProductPage />} />
            <Route path='/search' element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
