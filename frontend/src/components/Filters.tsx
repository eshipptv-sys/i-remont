interface Props {
  filters: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onReset: () => void;
}

const categories = [
  { value: '', label: 'Все категории' },
  { value: 'IPHONE', label: 'iPhone' },
  { value: 'AIRPODS', label: 'AirPods' },
  { value: 'IPAD', label: 'iPad' },
  { value: 'MAC', label: 'Mac' },
  { value: 'WATCH', label: 'Watch' },
  { value: 'ACCESSORY', label: 'Аксессуары' },
  { value: 'OTHER', label: 'Другая техника' }
];

const memories = ['64 ГБ', '128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ'];
const colors = ['Черный', 'Белый', 'Синий', 'Красный', 'Фиолетовый', 'Титановый', 'Сияние'];

export const Filters: React.FC<Props> = ({ filters, onChange, onReset }) => {
  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Фильтры</h3>
        <button className="text-sm text-accent" onClick={onReset}>
          Сбросить
        </button>
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-slate-600">Категория</label>
        <select
          className="w-full border rounded-md px-3 py-2"
          value={filters.category || ''}
          onChange={(e) => onChange('category', e.target.value)}
        >
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-600">Цена от</label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            value={filters.minPrice || ''}
            onChange={(e) => onChange('minPrice', e.target.value)}
            placeholder="30000"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600">Цена до</label>
          <input
            type="number"
            className="w-full border rounded-md px-3 py-2"
            value={filters.maxPrice || ''}
            onChange={(e) => onChange('maxPrice', e.target.value)}
            placeholder="120000"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-600">Память</label>
        <div className="flex flex-wrap gap-2">
          {memories.map((memory) => (
            <button
              key={memory}
              onClick={() => onChange('memory', memory === filters.memory ? '' : memory)}
              className={`px-3 py-1 rounded-full border text-sm ${filters.memory === memory ? 'bg-accent text-white' : 'bg-white'}`}
            >
              {memory}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-600">Цвет</label>
        <select
          className="w-full border rounded-md px-3 py-2"
          value={filters.color || ''}
          onChange={(e) => onChange('color', e.target.value)}
        >
          <option value="">Любой</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-slate-600">Состояние</label>
        <div className="flex gap-3">
          {[
            { value: '', label: 'Все' },
            { value: 'NEW', label: 'Новые' },
            { value: 'LIKE_NEW', label: 'Как новые' },
            { value: 'USED', label: 'Б/У' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => onChange('condition', item.value)}
              className={`px-3 py-1 rounded-full border text-sm ${filters.condition === item.value ? 'bg-accent text-white' : 'bg-white'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
