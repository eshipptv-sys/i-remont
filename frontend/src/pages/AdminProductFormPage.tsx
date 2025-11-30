import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { createProduct, fetchCategories, fetchProduct, updateProduct } from '../api/products';
import { Category, Product } from '../types';

const emptyCharacteristics = `{
  "Дисплей": "6.1 OLED",
  "Память": "256GB"
}`;

const AdminProductFormPage = () => {
  const { id: slug } = useParams();
  const [product, setProduct] = useState<Partial<Product>>({
    inStock: true,
    characteristics: emptyCharacteristics,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories().then(setCategories);
    if (slug) {
      fetchProduct(slug)
        .then((data) =>
          setProduct({
            ...data,
            characteristics: JSON.stringify(data.characteristics || {}, null, 2),
            images: data.images,
            categoryId: data.category?.id,
          }),
        )
        .catch(() => setError('Не удалось загрузить товар'));
    }
  }, [slug]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return navigate('/admin');
    try {
      const payload = {
        ...product,
        price: Number(product.price),
        oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
        categoryId: Number(product.categoryId || product.category?.id),
        characteristics:
          typeof product.characteristics === 'string'
            ? JSON.parse(product.characteristics || '{}')
            : product.characteristics,
        gallery: Array.isArray(product.images)
          ? product.images.map((img, idx) => ({ url: img.url, position: img.position ?? idx }))
          : [],
      } as unknown as Product;

      if (product.id) {
        await updateProduct(token, Number(product.id), payload);
      } else {
        await createProduct(token, payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="page page--narrow">
      <Helmet>
        <title>{slug ? 'Редактирование' : 'Создание'} товара — i-Remont</title>
      </Helmet>
      <h1>{slug ? 'Редактировать товар' : 'Создать товар'}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Название
          <input value={product.name || ''} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
        </label>
        <label>
          Бренд
          <input value={product.brand || ''} onChange={(e) => setProduct({ ...product, brand: e.target.value })} required />
        </label>
        <label>
          Категория
          <select
            value={product.categoryId || ''}
            onChange={(e) => setProduct({ ...product, categoryId: Number(e.target.value) })}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form__grid">
          <label>
            Цена
            <input type="number" value={product.price || ''} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} required />
          </label>
          <label>
            Старая цена
            <input
              type="number"
              value={product.oldPrice || ''}
              onChange={(e) => setProduct({ ...product, oldPrice: Number(e.target.value) })}
            />
          </label>
        </div>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={product.inStock}
            onChange={(e) => setProduct({ ...product, inStock: e.target.checked })}
          />
          В наличии
        </label>
        <label>
          Краткое описание
          <input
            value={product.shortDescription || ''}
            onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
            required
          />
        </label>
        <label>
          Описание (HTML)
          <textarea
            rows={4}
            value={product.description || ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
          />
        </label>
        <div className="form__grid">
          <label>
            Память
            <input value={product.memory || ''} onChange={(e) => setProduct({ ...product, memory: e.target.value })} />
          </label>
          <label>
            Цвет
            <input value={product.color || ''} onChange={(e) => setProduct({ ...product, color: e.target.value })} />
          </label>
        </div>
        <label>
          Главное фото (URL)
          <input
            value={product.mainImageUrl || ''}
            onChange={(e) => setProduct({ ...product, mainImageUrl: e.target.value })}
            required
          />
        </label>
        <label>
          Галерея (через запятую)
          <input
            value={Array.isArray(product.images) ? product.images.map((img) => img.url).join(',') : ''}
            onChange={(e) =>
              setProduct({
                ...product,
                images: e.target.value
                  .split(',')
                  .filter(Boolean)
                  .map((url) => ({ url, id: 0, position: 0 })),
              })
            }
          />
        </label>
        <label>
          Характеристики (JSON)
          <textarea
            rows={4}
            value={typeof product.characteristics === 'string' ? product.characteristics : JSON.stringify(product.characteristics || {}, null, 2)}
            onChange={(e) => setProduct({ ...product, characteristics: e.target.value })}
          />
        </label>
        <div className="form__grid">
          <label>
            SEO Title
            <input value={product.seoTitle || ''} onChange={(e) => setProduct({ ...product, seoTitle: e.target.value })} />
          </label>
          <label>
            SEO Description
            <input
              value={product.seoDescription || ''}
              onChange={(e) => setProduct({ ...product, seoDescription: e.target.value })}
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="button" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AdminProductFormPage;
