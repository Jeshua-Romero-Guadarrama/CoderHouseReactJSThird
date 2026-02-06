import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { categorias } from "../data/categorias";
import {
  obtenerProductos,
  obtenerProductosPorCategoria,
} from "../services/firestore";

function ItemListContainer({ mensajeBienvenida }) {
  const { categoriaId: idCategoria } = useParams();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const nombreCategoria = useMemo(() => {
    if (!idCategoria) return "Todos los servicios";
    return (
      categorias.find((categoria) => categoria.id === idCategoria)?.nombre ||
      "Categoria"
    );
  }, [idCategoria]);

  useEffect(() => {
    // Controla el llamado asincrono y reacciona a cambios de categoria.
    let activo = true;
    setCargando(true);
    setError("");

    const pedido = idCategoria
      ? obtenerProductosPorCategoria(idCategoria)
      : obtenerProductos();

    pedido
      .then((respuesta) => {
        if (activo) setProductos(respuesta);
      })
      .catch((e) => {
        if (activo) setError(e.message || "Error al cargar productos");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [idCategoria]);

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/60 p-8 shadow-2xl shadow-sky-500/10 ring-1 ring-slate-800/60">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
          Business Analytics MX
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
          {mensajeBienvenida}
        </h1>
        <p className="mt-3 text-slate-300">
          <span aria-hidden="true" className="mr-2">
            &#x1F4DA;
          </span>
          Catalogo:{" "}
          <span className="font-semibold text-white">{nombreCategoria}</span>
        </p>
      </header>

      {cargando && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
          <span aria-hidden="true" className="mr-2">
            &#x23F3;
          </span>
          Cargando catalogo...
        </div>
      )}

      {!cargando && error && (
        <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-6 text-red-100">
          {error}
        </div>
      )}

      {!cargando && !error && productos.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-slate-200">
          No hay productos disponibles para esta categoria.
        </div>
      )}

      {!cargando && !error && productos.length > 0 && (
        <ItemList productos={productos} />
      )}
    </section>
  );
}

export default ItemListContainer;
