import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

const normalizarCantidad = (cantidad, stock) => {
  if (!Number.isFinite(cantidad) || cantidad <= 0) return 0;
  if (!Number.isFinite(stock) || stock <= 0) return cantidad;
  return Math.min(cantidad, stock);
};

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const cantidadValida = normalizarCantidad(cantidad, producto?.stock);
    if (!producto || cantidadValida <= 0) return;

    setCarrito((carritoActual) => {
      const productoEnCarrito = carritoActual.find(
        (productoEnLista) => productoEnLista.id === producto.id
      );

      if (productoEnCarrito) {
        const cantidadNueva = normalizarCantidad(
          productoEnCarrito.cantidad + cantidadValida,
          producto.stock
        );

        return carritoActual.map((productoEnLista) =>
          productoEnLista.id === producto.id
            ? {
                ...productoEnLista,
                cantidad: cantidadNueva,
              }
            : productoEnLista
        );
      }

      return [
        ...carritoActual,
        {
          id: producto.id,
          titulo: producto.titulo,
          precio: producto.precio,
          categoria: producto.categoria,
          stock: producto.stock,
          cantidad: cantidadValida,
        },
      ];
    });
  };

  const aumentarCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.map((productoEnLista) => {
        if (productoEnLista.id !== id) return productoEnLista;
        const cantidadNueva = normalizarCantidad(
          productoEnLista.cantidad + 1,
          productoEnLista.stock
        );
        return { ...productoEnLista, cantidad: cantidadNueva };
      })
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((productoEnLista) =>
          productoEnLista.id === id
            ? {
                ...productoEnLista,
                cantidad: Math.max(0, productoEnLista.cantidad - 1),
              }
            : productoEnLista
        )
        .filter((productoEnLista) => productoEnLista.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((productoEnLista) => productoEnLista.id !== id)
    );
  };

  const limpiarCarrito = () => setCarrito([]);

  const { totalServicios, totalPrecio } = useMemo(() => {
    return carrito.reduce(
      (acumulado, productoEnLista) => {
        acumulado.totalServicios += productoEnLista.cantidad;
        acumulado.totalPrecio +=
          productoEnLista.precio * productoEnLista.cantidad;
        return acumulado;
      },
      { totalServicios: 0, totalPrecio: 0 }
    );
  }, [carrito]);

  const value = useMemo(
    () => ({
      carrito,
      totalServicios,
      totalPrecio,
      agregarAlCarrito,
      aumentarCantidad,
      disminuirCantidad,
      eliminarDelCarrito,
      limpiarCarrito,
    }),
    [carrito, totalServicios, totalPrecio]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};
