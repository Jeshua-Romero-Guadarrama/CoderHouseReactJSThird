function Contacto() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/40">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          <span aria-hidden="true" className="mr-2">
            &#x1F4DE;
          </span>
          Contacto
        </p>
        <h3 className="text-2xl font-semibold text-white">
          Agenda una llamada personalizada
        </h3>
        <p className="text-slate-300">
          Aclara dudas sobre rutas de aprendizaje, prerequisitos y proximas
          cohortes.
        </p>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>- Consultoria rapida sobre tu perfil.</li>
          <li>- Recomendaciones de stack para tu rol.</li>
          <li>- Demo de clases y campus virtual.</li>
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border border-sky-400/30 bg-sky-500/10 p-6 text-sky-50 shadow-lg shadow-sky-500/20">
        <p className="text-xs uppercase tracking-[0.25em] text-sky-200">
          <span aria-hidden="true" className="mr-2">
            &#x1F464;
          </span>
          Asesor asignado
        </p>
        <h4 className="text-xl font-semibold text-white">
          Jeshua Romero Guadarrama
        </h4>
        <p className="text-sm text-sky-100/90">
          Contactame para armar tu plan de estudios y acelerar tu carrera en
          datos.
        </p>
        <a
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-400"
          href="mailto:contacto@tiendacursosdatos.com"
        >
          Escribir a Jeshua
        </a>
      </div>
    </div>
  );
}

export default Contacto;
