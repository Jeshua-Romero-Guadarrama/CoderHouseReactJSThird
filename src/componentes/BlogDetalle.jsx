import { Link, useParams } from "react-router-dom";

function BlogDetalle({ entradas = [] }) {
  const { entradaId } = useParams();

  const entrada = entradas.find((item) => item.id === entradaId);

  if (!entrada) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          <span aria-hidden="true" className="mr-2">
            &#x1F4F0;
          </span>
          Blog
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Articulo no encontrado
        </h2>
        <p className="mt-2 text-slate-300">
          Revisa la URL o vuelve al listado de articulos.
        </p>
        <Link
          to="/blog"
          className="mt-5 inline-flex rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
        >
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        <span aria-hidden="true" className="mr-2">
          &#x1F4D6;
        </span>
        Articulo
      </p>
      <h2 className="mt-2 text-3xl font-bold text-white">{entrada.titulo}</h2>
      <p className="mt-2 text-slate-300">{entrada.bajada}</p>

      <div className="mt-6 space-y-4 text-sm text-slate-200">
        {entrada.contenido.map((parrafo, index) => (
          <p key={`${entrada.id}-${index}`}>{parrafo}</p>
        ))}
      </div>

      <Link
        to="/blog"
        className="mt-6 inline-flex rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-slate-500"
      >
        <span aria-hidden="true" className="mr-2">
          &#x1F519;
        </span>
        Volver al blog
      </Link>
    </article>
  );
}

export default BlogDetalle;
