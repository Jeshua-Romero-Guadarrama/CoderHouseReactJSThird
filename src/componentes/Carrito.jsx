import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

function Carrito() {
  const {
    carrito,
    totalServicios,
    totalPrecio,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
  } = useCart();
  const monto = totalPrecio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-6">
      <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            <span aria-hidden="true" className="mr-2">
              &#x1F6D2;
            </span>
            Carrito
          </h3>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            {totalServicios} servicio(s)
          </span>
        </div>

        {carrito.length === 0 ? (
          <div className="mt-3 space-y-3 text-sm text-slate-300">
            <p>Aun no has agregado servicios. Ve al catalogo para seleccionar.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-slate-500"
            >
              <span aria-hidden="true">&#x1F4E6;</span>
              Ir al catalogo
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {carrito.map((producto) => (
              <CartItem
                key={producto.id}
                producto={producto}
                onAumentar={aumentarCantidad}
                onDisminuir={disminuirCantidad}
                onEliminar={eliminarDelCarrito}
              />
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-50">
          <span className="text-sm font-semibold">
            <span aria-hidden="true" className="mr-2">
              &#x1F4B0;
            </span>
            Total
          </span>
          <span className="text-base font-bold">{monto}</span>
          {carrito.length > 0 && (
            <button
              type="button"
              onClick={limpiarCarrito}
              className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-100 hover:border-red-400/70"
            >
              Limpiar carrito
            </button>
          )}
        </div>
      </article>

      <CheckoutForm />
    </div>
  );
}

export default Carrito;
