import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">404</p>
      <h2 className="mt-2 text-2xl font-bold text-white">
        <span aria-hidden="true" className="mr-2">
          &#x26A0;
        </span>
        Pagina no encontrada
      </h2>
      <p className="mt-2 text-slate-300">
        Revisa la URL o vuelve al catalogo.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
      >
        Ir al catalogo
      </Link>
    </div>
  );
}

export default NotFound;
