interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SortSelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-600">Сортировка:</span>
      <select
        className="border rounded-md px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="new">Новинки</option>
        <option value="popular">Популярность</option>
        <option value="price-asc">Цена ↑</option>
        <option value="price-desc">Цена ↓</option>
      </select>
    </div>
  );
};
