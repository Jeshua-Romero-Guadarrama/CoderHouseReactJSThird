import { useState } from "react";

function ItemCount({ stock = 10, inicial = 1, onAgregar }) {
  const cantidadInicial = Math.min(inicial, stock);
  const [cantidad, setCantidad] = useState(cantidadInicial);

  const aumentar = () => setCantidad((c) => Math.min(stock, c + 1));
  const disminuir = () => setCantidad((c) => Math.max(1, c - 1));

  return (
    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        <span aria-hidden="true" className="mr-2">
          &#x1F522;
        </span>
        Selecciona unidades
      </p>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={disminuir}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-slate-500"
          aria-label="Disminuir cantidad"
          disabled={cantidad <= 1}
        >
          -
        </button>

        <span className="min-w-12 text-center text-lg font-bold text-white">
          {cantidad}
        </span>

        <button
          type="button"
          onClick={aumentar}
          className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-slate-500"
          aria-label="Aumentar cantidad"
          disabled={cantidad >= stock}
        >
          +
        </button>

        <button
          type="button"
          onClick={() => onAgregar(cantidad)}
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-400"
          disabled={stock <= 0 || cantidad <= 0}
        >
          <span aria-hidden="true">&#x1F6D2;</span>
          Agregar al carrito
        </button>
      </div>

      <p className="mt-2 text-xs text-slate-400">Stock disponible: {stock}</p>
    </div>
  );
}

export default ItemCount;
