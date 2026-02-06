function CartItem({ producto, onAumentar, onDisminuir, onEliminar }) {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-900/60 px-3 py-3 text-sm text-slate-100">
      <div className="space-y-1">
        <p className="font-semibold text-white">{producto.titulo}</p>
        <p className="text-xs text-slate-400">
          Cantidad: {producto.cantidad}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-100 hover:border-slate-500"
          onClick={() => onDisminuir(producto.id)}
          aria-label={`Disminuir ${producto.titulo}`}
        >
          -
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-100 hover:border-slate-500"
          onClick={() => onAumentar(producto.id)}
          aria-label={`Aumentar ${producto.titulo}`}
        >
          +
        </button>

        <button
          type="button"
          className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-2 py-1 text-xs font-semibold text-orange-100 hover:border-orange-400/60"
          onClick={() => onEliminar(producto.id)}
          aria-label={`Eliminar ${producto.titulo}`}
        >
          Eliminar
        </button>

        <p className="text-sm font-semibold text-white">
          {(producto.precio * producto.cantidad).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
    </li>
  );
}

export default CartItem;
