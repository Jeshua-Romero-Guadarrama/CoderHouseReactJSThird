import { Link } from "react-router-dom";

function Item({ producto }) {
  const precio = producto.precio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-900/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {producto.nivel} - {producto.duracion}
          </p>
          <h4 className="text-xl font-semibold text-white">{producto.titulo}</h4>
        </div>
        <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-100">
          {producto.formato}
        </span>
      </div>

      <p className="text-sm text-slate-300">{producto.descripcion}</p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            <span aria-hidden="true" className="mr-2">
              &#x1F4B0;
            </span>
            Inversion
          </p>
          <p className="text-lg font-semibold text-white">{precio}</p>
        </div>

        {/* Presenta un enlace a la ruta de detalle sin recargar la pagina. */}
        <Link
          to={`/item/${producto.id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-400"
        >
          <span aria-hidden="true">&#x1F50E;</span>
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default Item;
