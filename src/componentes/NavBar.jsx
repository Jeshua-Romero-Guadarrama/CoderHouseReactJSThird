import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";
import { categorias } from "../data/categorias";

function NavBar() {
  const claseNav = ({ isActive }) =>
    `rounded-xl px-4 py-2 transition ${
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-200 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-500/15 text-lg text-sky-200">
            &#x1F916;
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Consultora de Analitica
            </p>
            <p className="text-lg font-semibold text-white">
              Business Analytics MX
            </p>
          </div>
        </Link>

        {/* Marca la ruta activa y evita recargas de pagina. */}
        <nav aria-label="Navegacion principal" className="hidden md:block">
          <ul className="flex items-center gap-2 text-sm font-medium">
            <li>
              <NavLink to="/" end className={claseNav}>
                <span aria-hidden="true" className="mr-2">
                  &#x1F4E6;
                </span>
                Catalogo
              </NavLink>
            </li>

            {/* Expone las categorias disponibles desde el menu. */}
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <NavLink to={`/category/${categoria.id}`} className={claseNav}>
                  <span aria-hidden="true" className="mr-2">
                    &#x1F4C1;
                  </span>
                  {categoria.nombre}
                </NavLink>
              </li>
            ))}

            <li>
              <NavLink to="/blog" className={claseNav}>
                <span aria-hidden="true" className="mr-2">
                  &#x1F4F0;
                </span>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={claseNav}>
                <span aria-hidden="true" className="mr-2">
                  &#x1F4DE;
                </span>
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CartWidget />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
