import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CoffeeList } from './pages/CoffeeList';
import { CoffeeDetail } from './pages/CoffeeDetail';
import { NewCoffee } from './pages/NewCoffee';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CoffeeList />} />
            <Route path="/coffee/:id" element={<CoffeeDetail />} />
            <Route path="/new" element={<NewCoffee />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}