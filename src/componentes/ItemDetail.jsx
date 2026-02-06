import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

function ItemDetail({ producto }) {
  const { agregarAlCarrito } = useCart();
  const [cantidadAgregada, setCantidadAgregada] = useState(0);
  const stockDisponible = Number.isFinite(producto.stock)
    ? producto.stock
    : 0;
  const precio = producto.precio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

  const manejarAgregar = (cantidad) => {
    // Envia el producto y la cantidad seleccionada al carrito.
    agregarAlCarrito(producto, cantidad);
    setCantidadAgregada(cantidad);
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          <span aria-hidden="true" className="mr-2">
            &#x1F4DD;
          </span>
          Detalle del servicio
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white">{producto.titulo}</h2>
        <p className="mt-3 text-slate-300">{producto.descripcion}</p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <span aria-hidden="true" className="mr-2">
                &#x1F3C6;
              </span>
              Nivel
            </p>
            <p className="text-sm font-semibold text-white">{producto.nivel}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <span aria-hidden="true" className="mr-2">
                &#x23F1;
              </span>
              Duracion
            </p>
            <p className="text-sm font-semibold text-white">
              {producto.duracion}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <span aria-hidden="true" className="mr-2">
                &#x1F4B0;
              </span>
              Inversion
            </p>
            <p className="text-sm font-semibold text-white">{precio}</p>
          </div>
        </div>

        {stockDisponible <= 0 && (
          <div className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-100">
            Producto sin stock por el momento.
          </div>
        )}

        {stockDisponible > 0 && cantidadAgregada === 0 && (
          <ItemCount
            stock={stockDisponible}
            inicial={1}
            onAgregar={manejarAgregar}
          />
        )}

        {cantidadAgregada > 0 && (
          <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            Agregaste {cantidadAgregada} unidad(es) al carrito.
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-slate-500"
          >
            <span aria-hidden="true" className="mr-2">
              &#x1F519;
            </span>
            Volver al catalogo
          </Link>
          <Link
            to="/carrito"
            className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:border-emerald-400/60"
          >
            <span aria-hidden="true" className="mr-2">
              &#x1F6D2;
            </span>
            Ir al carrito
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ItemDetail;
