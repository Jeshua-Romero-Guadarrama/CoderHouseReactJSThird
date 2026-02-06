import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/firestore";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
  const { itemId: idItem } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Controla el pedido asincrono y reacciona al cambio del idItem.
    let activo = true;
    setCargando(true);
    setError("");

    obtenerProductoPorId(idItem)
      .then((respuesta) => {
        if (activo) setProducto(respuesta);
      })
      .catch((e) => {
        if (activo) setError(e.message || "Error al cargar el producto");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [idItem]);

  if (cargando) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
        Cargando detalle...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-6 text-red-100">
        {error}
      </div>
    );
  }

  return <ItemDetail producto={producto} />;
}

export default ItemDetailContainer;
