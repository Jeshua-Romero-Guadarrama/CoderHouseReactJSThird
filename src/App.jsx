import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./componentes/NavBar";
import ItemListContainer from "./componentes/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer";
import Carrito from "./componentes/Carrito";
import Contacto from "./componentes/Contacto";
import Blog from "./componentes/Blog";
import BlogDetalle from "./componentes/BlogDetalle";
import NotFound from "./componentes/NotFound";

function App() {
  // Define contenido de blog simulado para la seccion de noticias.
  const entradasBlog = [
    {
      id: "blog-estrategia-datos",
      titulo: "Estrategia de datos en 90 dias",
      bajada: "Como priorizar casos de uso y un roadmap accionable.",
      contenido: [
        "Una estrategia de datos clara inicia con objetivos de negocio medibles y un inventario realista de capacidades actuales.",
        "El orden recomendado parte de casos de uso con impacto inmediato, luego habilita gobierno y calidad, y al final escala con automatizacion.",
        "Un roadmap trimestral con responsables evita dispersion y permite mostrar avances rapidos.",
      ],
    },
    {
      id: "blog-gobierno",
      titulo: "Gobierno de datos pragmatico",
      bajada: "Lineage, calidad y ownership sin burocracia.",
      contenido: [
        "El gobierno de datos no es un comite eterno, es un conjunto de reglas claras y responsabilidades visibles.",
        "Un marco pragmatico define owners por dominio, metricas de calidad y un ciclo corto de revision.",
        "Las herramientas de lineage ayudan cuando responden preguntas del negocio y no solo del area tecnica.",
      ],
    },
    {
      id: "blog-barreras",
      titulo: "Barreras conductuales en conversion",
      bajada: "Detecta fricciones y sesgos en tu funnel.",
      contenido: [
        "Las barreras conductuales aparecen como micro fricciones que frenan la decision del usuario.",
        "Un analisis de pasos criticos y mensajes ayuda a separar problemas de usabilidad de sesgos cognitivos.",
        "La evidencia debe combinar datos cuantitativos con pruebas cualitativas de contexto.",
      ],
    },
    {
      id: "blog-nudges",
      titulo: "Nudges en productos digitales",
      bajada: "Intervenciones simples que elevan la adherencia.",
      contenido: [
        "Un nudge efectivo cambia el contexto sin eliminar opciones ni imponer decisiones.",
        "Pequenos ajustes en el momento y el mensaje mejoran tasas de accion cuando se alinean con motivaciones reales.",
        "El experimento controlado valida si el cambio genera mejora sostenida.",
      ],
    },
    {
      id: "blog-ab-testing",
      titulo: "A/B testing bien hecho",
      bajada: "Diseno, poder estadistico y decisiones confiables.",
      contenido: [
        "Una prueba A/B confiable define una hipotesis clara y un indicador principal que responda al objetivo.",
        "El poder estadistico evita conclusiones apresuradas y permite interpretar resultados con confianza.",
        "Documentar variantes y resultados facilita decisiones futuras y evita repetir experimentos.",
      ],
    },
    {
      id: "blog-analytics-stack",
      titulo: "Stack analitico moderno",
      bajada: "Arquitectura base para BI y ML escalable.",
      contenido: [
        "Un stack moderno separa ingestion, almacenamiento, modelado y consumo con responsabilidades claras.",
        "La escalabilidad requiere catalogo de datos, monitoreo y definiciones consistentes de metricas.",
        "El objetivo es habilitar decisiones rapidas sin sacrificar calidad ni trazabilidad.",
      ],
    },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
        {/* Mantiene el NavBar visible en todas las rutas. */}
        <NavBar />

        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-14 pt-10">
          <Routes>
            {/* Muestra el catalogo principal. */}
            <Route
              path="/"
              element={
                <ItemListContainer mensajeBienvenida="Business Analytics MX: consultora en analitica y diseno conductual desde Mexico." />
              }
            />

            {/* Muestra el catalogo por categoria con ruta dinamica. */}
            <Route
              path="/category/:categoriaId"
              element={
                <ItemListContainer mensajeBienvenida="Explora servicios por categoria (ruta dinamica con params)." />
              }
            />

            {/* Muestra el detalle del producto con ruta dinamica. */}
            <Route
              path="/item/:itemId"
              element={<ItemDetailContainer />}
            />

            {/* Mantiene rutas extra del sitio. */}
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/blog" element={<Blog entradas={entradasBlog} />} />
            <Route
              path="/blog/:entradaId"
              element={<BlogDetalle entradas={entradasBlog} />}
            />
            <Route path="/contacto" element={<Contacto />} />

            {/* Renderiza el 404 para rutas inexistentes. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
