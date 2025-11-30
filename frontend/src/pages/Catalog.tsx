import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Filters } from '../components/Filters';
import { SortSelect } from '../components/SortSelect';
import { useSearchParams } from 'react-router-dom';

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [filters, setFilters] = useState<Record<string, string>>({ category: initialCategory, search: '' });
  const [sort, setSort] = useState('new');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({ ...filters, sort });
      setProducts(data.items);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, JSON.stringify(filters)]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ category: '', search: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Каталог техники i-Remont</h1>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <div className="md:sticky md:top-20 h-fit">
          <Filters filters={filters} onChange={handleFilterChange} onReset={handleReset} />
        </div>
        <div className="space-y-4">
          <div className="card p-4 flex gap-3">
            <input
              placeholder="Поиск по каталогу"
              className="flex-1 border rounded-md px-3 py-2"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            <button className="button-primary" onClick={load}>
              Найти
            </button>
          </div>

          {loading ? (
            <div className="text-center text-slate-500">Загружаем ассортимент...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {products.length === 0 && (
                <div className="col-span-full text-center text-slate-500">Ничего не найдено. Попробуйте другие фильтры.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
