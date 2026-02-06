import { Link } from "react-router-dom";

function Blog({ entradas = [] }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          <span aria-hidden="true" className="mr-2">
            &#x1F4F0;
          </span>
          Blog de consultoria y analitica
        </p>
        <h3 className="text-2xl font-semibold text-white">
          Ideas, experimentos y aprendizajes
        </h3>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {entradas.map((entrada) => (
          <article
            key={entrada.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-900/30"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <span aria-hidden="true" className="mr-2">
                &#x1F4D6;
              </span>
              Articulo
            </p>
            <h4 className="text-lg font-semibold text-white">
              {entrada.titulo}
            </h4>
            <p className="text-sm text-slate-300">{entrada.bajada}</p>
            <Link
              to={`/blog/${entrada.id}`}
              className="mt-3 inline-flex text-sm font-semibold text-sky-200 hover:text-sky-100"
            >
              Leer articulo
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
