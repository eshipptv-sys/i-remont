import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: 30 }}>
      <h1>Товар #{id}</h1>
      <p>Описание товара будет здесь.</p>
    </div>
  );
}