import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartWidget() {
  const { totalServicios, totalPrecio } = useCart();
  const monto = totalPrecio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
  const resumenCarrito = `Ir al carrito. ${totalServicios} servicio(s). Total ${monto}.`;

  return (
    <Link
      to="/carrito"
      className="flex items-center gap-2 rounded-2xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-orange-50 shadow-lg shadow-orange-500/15 transition hover:-translate-y-0.5 hover:bg-orange-500/15"
      aria-label={resumenCarrito}
      title={resumenCarrito}
    >
      <div
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-400/50 bg-orange-500/20 text-base font-bold"
        aria-hidden="true"
      >
        <span aria-hidden="true" className="text-orange-100">
          &#x1F6D2;
        </span>
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-orange-500 px-2 py-[3px] text-xs font-bold text-white shadow-lg shadow-orange-500/40">
          {totalServicios}
        </span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-[0.25em] text-orange-200">
          Total
        </span>
        <span className="text-sm font-semibold text-orange-50">{monto}</span>
      </div>
    </Link>
  );
}

export default CartWidget;
