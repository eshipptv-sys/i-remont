import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProduct, fetchProducts } from '../api/products';
import { Product } from '../types';
import { useCart } from '../state/CartContext';
import { ProductCard } from '../components/ProductCard';

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const { add } = useCart();

  useEffect(() => {
    if (!slug) return;
    fetchProduct(slug).then((data) => {
      setProduct(data);
      fetchProducts({ category: data.category.slug, take: 4 }).then((r) => setRelated(r.items.filter((p) => p.slug !== slug)));
    });
  }, [slug]);

  if (!product) return <p>Загрузка...</p>;

  return (
    <div className="page">
      <Helmet>
        <title>{product.seoTitle || product.name}</title>
        {product.seoDescription && <meta name="description" content={product.seoDescription} />}
        {product.seoKeywords && <meta name="keywords" content={product.seoKeywords} />}
      </Helmet>
      <div className="product">
        <div className="product__gallery">
          <img src={product.mainImageUrl} alt={product.name} className="product__main" />
          <div className="product__thumbs">
            {[product.mainImageUrl, ...product.images.map((img) => img.url)].map((url, idx) => (
              <img key={idx} src={url} alt={`${product.name}-${idx}`} />
            ))}
          </div>
        </div>
        <div className="product__info">
          <p className="eyebrow">{product.brand}</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.category.name}</p>
          <p className="product__price">
            {product.oldPrice && <span className="old">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>}
            <span>{product.price.toLocaleString('ru-RU')} ₽</span>
          </p>
          <p className="muted">{product.inStock ? 'В наличии' : 'Нет в наличии'}</p>
          <div className="cta">
            <button className="button" onClick={() => add(product)} disabled={!product.inStock}>
              Добавить в корзину
            </button>
          </div>
          <div className="product__description" dangerouslySetInnerHTML={{ __html: product.description }} />
          <h3>Характеристики</h3>
          <table className="table">
            <tbody>
              {Object.entries(product.characteristics || {}).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section>
        <div className="section-heading">
          <h2>Похожие модели</h2>
        </div>
        <div className="grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
