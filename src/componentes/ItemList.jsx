import Item from "./Item";

function ItemList({ productos }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ItemList;
