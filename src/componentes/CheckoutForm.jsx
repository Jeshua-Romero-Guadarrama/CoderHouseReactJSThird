import { useMemo, useState } from "react";
import { crearOrden } from "../services/firestore";
import { useCart } from "../context/CartContext";

const correoValido = (correo) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

function CheckoutForm() {
  const { carrito, totalPrecio, limpiarCarrito } = useCart();
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    emailConfirmacion: "",
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [ordenId, setOrdenId] = useState("");
  const carritoVacio = carrito.length === 0;

  const monto = useMemo(
    () =>
      totalPrecio.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }),
    [totalPrecio]
  );

  const actualizarCampo = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    if (!formData.nombre.trim()) return "Completa el nombre y apellido.";
    if (!formData.telefono.trim()) return "Completa el telefono.";
    if (!correoValido(formData.email)) return "Ingresa un email valido.";
    if (formData.email !== formData.emailConfirmacion) {
      return "Los emails no coinciden.";
    }
    if (carrito.length === 0) return "El carrito esta vacio.";
    return "";
  };

  const enviarOrden = async (event) => {
    event.preventDefault();
    const errorValidacion = validar();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setCargando(true);
    setError("");

    try {
      const orden = {
        comprador: {
          nombre: formData.nombre.trim(),
          telefono: formData.telefono.trim(),
          email: formData.email.trim(),
        },
        items: carrito.map((producto) => ({
          id: producto.id,
          titulo: producto.titulo,
          cantidad: producto.cantidad,
          precio: producto.precio,
        })),
        total: totalPrecio,
      };

      const idGenerada = await crearOrden(orden);
      setOrdenId(idGenerada);
      limpiarCarrito();
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        emailConfirmacion: "",
      });
    } catch (e) {
      setError(e.message || "No se pudo generar la orden.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40">
      <h3 className="text-lg font-semibold text-white">Checkout</h3>
      <p className="mt-1 text-sm text-slate-300">
        Completa tus datos para generar la orden. Total: {monto}.
      </p>

      {carritoVacio && !ordenId && (
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          Agrega productos al carrito para habilitar el checkout.
        </div>
      )}

      {ordenId && (
        <div className="mt-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
          Orden generada con exito. Tu id es:{" "}
          <span className="font-semibold text-white">{ordenId}</span>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <form className="mt-4 grid gap-4" onSubmit={enviarOrden}>
        <label className="grid gap-2 text-sm text-slate-200">
          Nombre y apellido
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={actualizarCampo}
            className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            autoComplete="name"
            required
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-200">
          Telefono
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={actualizarCampo}
            className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            autoComplete="tel"
            required
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-200">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={actualizarCampo}
            className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            autoComplete="email"
            required
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-200">
          Confirmar email
          <input
            type="email"
            name="emailConfirmacion"
            value={formData.emailConfirmacion}
            onChange={actualizarCampo}
            className="rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
            autoComplete="email"
            required
          />
        </label>

        <button
          type="submit"
          disabled={cargando || carritoVacio}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
        >
          {cargando ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </article>
  );
}

export default CheckoutForm;
