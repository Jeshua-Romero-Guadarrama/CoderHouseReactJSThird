import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const mapDoc = (documento) => ({ id: documento.id, ...documento.data() });

export const obtenerProductos = async () => {
  const snapshot = await getDocs(collection(db, "productos"));
  return snapshot.docs.map(mapDoc);
};

export const obtenerProductosPorCategoria = async (categoriaId) => {
  const q = query(
    collection(db, "productos"),
    where("categoria", "==", categoriaId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc);
};

export const obtenerProductoPorId = async (idProducto) => {
  const ref = doc(db, "productos", idProducto);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    throw new Error("Producto no encontrado");
  }
  return mapDoc(snapshot);
};

export const crearOrden = async (orden) => {
  const ref = await addDoc(collection(db, "ordenes"), {
    ...orden,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};
