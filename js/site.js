(() => {
  const CONTACT = {
    phoneDisplay: "+52 664 305 3834",
    phoneTel: "+526643053834",
    phoneWa: "526643053834",
    email: "daniel@majesticlabel.com",
  };

  const SUPABASE = {
    url: "https://dsciyymehvivqvubukpv.supabase.co",
    anonKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzY2l5eW1laHZpdnF2dWJ1a3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNzcxNjMsImV4cCI6MjA4MTk1MzE2M30.o-StWAzQevNCmTmF2LYQC6yiwF2F95-G5BoNDYGLk_s",
  };

  const SELECTORS = {
    modal: "#ml-quote-modal",
    form: "#ml-quote-form",
    result: "#ml-quote-result",
    openers: "a.btn--quote, a[href*='#cotizacion']",
  };

  function elFromHTML(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  function ensureWhatsAppFab() {
    if (document.querySelector("#ml-whatsapp-fab")) return;

    const a = elFromHTML(`
      <a
        id="ml-whatsapp-fab"
        class="ml-fab"
        href="https://wa.me/${CONTACT.phoneWa}"
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        title="WhatsApp ${CONTACT.phoneDisplay}"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .18 5.31.18 11.85c0 2.09.55 4.14 1.6 5.95L0 24l6.37-1.67a11.86 11.86 0 0 0 5.68 1.45h.01c6.56 0 11.89-5.31 11.89-11.85 0-3.16-1.23-6.13-3.43-8.45ZM12.06 21.8h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.78.99 1.01-3.69-.23-.38a9.83 9.83 0 0 1-1.5-5.27c0-5.44 4.45-9.87 9.92-9.87 2.64 0 5.11 1.02 6.97 2.88a9.8 9.8 0 0 1 2.89 6.99c0 5.44-4.45 9.93-9.89 9.93Zm5.75-7.38c-.31-.16-1.86-.91-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1.01 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.75-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.62-.52-.54-.71-.55h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.62 0 1.54 1.13 3.03 1.28 3.24.16.21 2.22 3.39 5.38 4.76.75.33 1.34.52 1.8.67.75.24 1.45.2 2 .12.6-.09 1.86-.76 2.12-1.46.26-.71.26-1.31.18-1.44-.08-.13-.29-.21-.6-.36Z"/>
        </svg>
      </a>
    `);

    document.body.appendChild(a);
  }

  function ensureQuoteModal() {
    if (document.querySelector(SELECTORS.modal)) return;

    const modal = elFromHTML(`
      <div id="ml-quote-modal" class="ml-modal" role="dialog" aria-modal="true" aria-label="Solicitud de cotización" hidden>
        <div class="ml-modal__backdrop" data-ml-close="true"></div>
        <div class="ml-modal__dialog" role="document">
          <div class="ml-modal__head">
            <div>
              <h2 class="ml-modal__title">Solicitar cotización</h2>
              <p class="ml-modal__subtitle">También puedes contactarnos por teléfono <a class="ml-link" href="tel:${CONTACT.phoneTel}">${CONTACT.phoneDisplay}</a> o correo <a class="ml-link" href="mailto:${CONTACT.email}">${CONTACT.email}</a>.</p>
            </div>
            <button type="button" class="ml-modal__close" aria-label="Cerrar" data-ml-close="true">×</button>
          </div>

          <form id="ml-quote-form" class="ml-form" novalidate>
            <div class="ml-grid">
              <div class="ml-field">
                <label class="ml-label" for="ml-nombre">Nombre completo</label>
                <input class="ml-input" id="ml-nombre" name="nombre_completo" autocomplete="name" required />
              </div>

              <div class="ml-field">
                <label class="ml-label" for="ml-correo">Correo</label>
                <input class="ml-input" id="ml-correo" name="correo" type="email" autocomplete="email" required />
              </div>

              <div class="ml-field">
                <label class="ml-label" for="ml-telefono">Teléfono</label>
                <input class="ml-input" id="ml-telefono" name="telefono" type="tel" autocomplete="tel" required />
              </div>

              <div class="ml-field">
                <label class="ml-label" for="ml-empresa">Empresa</label>
                <input class="ml-input" id="ml-empresa" name="empresa" autocomplete="organization" />
              </div>

              <div class="ml-field">
                <label class="ml-label" for="ml-material">Tipo de material</label>
                <select class="ml-input" id="ml-material" name="tipo_material">
                  <option value="">Selecciona…</option>
                  <option>Papel</option>
                  <option>Polipropileno (PP)</option>
                  <option>PET</option>
                  <option>Vinil</option>
                  <option>Transparente</option>
                  <option>Otro</option>
                </select>
              </div>

              <div class="ml-field">
                <label class="ml-label" for="ml-cantidad">Cantidad estimada</label>
                <input class="ml-input" id="ml-cantidad" name="cantidad_estimada" placeholder="Ej. 5,000" />
              </div>

              <div class="ml-field ml-field--full-sm">
                <label class="ml-label" for="ml-fecha">Entrega deseada</label>
                <input class="ml-input" id="ml-fecha" name="fecha_entrega" type="date" />
              </div>

              <div class="ml-field ml-field--full">
                <label class="ml-label" for="ml-desc">Descripción del proyecto</label>
                <textarea class="ml-textarea" id="ml-desc" name="descripcion_proyecto" rows="5" required placeholder="Cuéntanos tamaño, aplicación, superficie, acabado, si requiere lote/fecha/QR, etc."></textarea>
              </div>
            </div>

            <p id="ml-quote-alert" class="ml-alert" role="status" aria-live="polite" hidden></p>

            <div class="ml-actions">
              <button type="button" class="btn btn--ghost" data-ml-close="true">Cancelar</button>
              <button type="submit" class="btn btn--quote">Enviar solicitud</button>
            </div>
          </form>

          <div id="ml-quote-result" class="ml-result" hidden>
            <div class="ml-result__icon" aria-hidden="true"></div>
            <h3 class="ml-result__title"></h3>
            <p class="ml-result__text"></p>
            <div class="ml-actions">
              <button type="button" class="btn btn--ghost" data-ml-result-back="true" hidden>Volver</button>
              <button type="button" class="btn btn--quote" data-ml-close="true">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `);

    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest("[data-ml-close='true']")) closeModal();
      if (target.closest("[data-ml-result-back='true']")) showFormView();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) closeModal();
    });

    const form = modal.querySelector(SELECTORS.form);
    if (form) {
      form.addEventListener("submit", onSubmit);
    }
  }

  function modalEl() {
    return document.querySelector(SELECTORS.modal);
  }

  function formEl() {
    const m = modalEl();
    return m ? m.querySelector(SELECTORS.form) : null;
  }

  function resultEl() {
    const m = modalEl();
    return m ? m.querySelector(SELECTORS.result) : null;
  }

  function showFormView() {
    const form = formEl();
    const result = resultEl();
    if (form instanceof HTMLElement) form.hidden = false;
    if (result instanceof HTMLElement) {
      result.hidden = true;
      result.removeAttribute("data-kind");
    }
    setAlert("", "info");
  }

  function resultIcon(kind) {
    if (kind === "success") {
      return `
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M9.55 16.2 5.8 12.45l1.4-1.4 2.35 2.35 7.25-7.25 1.4 1.4-8.65 8.65Z"/>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="m12 13.4-4.9 4.9-1.4-1.4 4.9-4.9-4.9-4.9 1.4-1.4 4.9 4.9 4.9-4.9 1.4 1.4-4.9 4.9 4.9 4.9-1.4 1.4-4.9-4.9Z"/>
      </svg>
    `;
  }

  function showResultView(kind, title, message, opts) {
    const options = opts || {};
    const form = formEl();
    const result = resultEl();
    if (!(result instanceof HTMLElement)) return;

    if (form instanceof HTMLElement) form.hidden = true;

    const icon = result.querySelector(".ml-result__icon");
    if (icon instanceof HTMLElement) icon.innerHTML = resultIcon(kind);

    const h = result.querySelector(".ml-result__title");
    if (h) h.textContent = title;

    const p = result.querySelector(".ml-result__text");
    if (p) p.textContent = message;

    const back = result.querySelector("[data-ml-result-back='true']");
    if (back instanceof HTMLElement) back.hidden = !options.showBack;

    result.dataset.kind = kind;
    result.hidden = false;

    const closeBtn = result.querySelector("[data-ml-close='true']");
    if (closeBtn instanceof HTMLElement) closeBtn.focus();
  }

  function isOpen() {
    const modal = document.querySelector(SELECTORS.modal);
    return !!modal && !modal.hasAttribute("hidden");
  }

  function openModal() {
    ensureQuoteModal();
    const modal = document.querySelector(SELECTORS.modal);
    if (!modal) return;

    showFormView();

    document.documentElement.classList.add("ml-lock");
    document.body.classList.add("ml-lock");

    modal.removeAttribute("hidden");

    const first = modal.querySelector("input, select, textarea, button");
    if (first instanceof HTMLElement) first.focus();
  }

  function closeModal() {
    const modal = document.querySelector(SELECTORS.modal);
    if (!modal) return;

    modal.setAttribute("hidden", "");
    document.documentElement.classList.remove("ml-lock");
    document.body.classList.remove("ml-lock");

    showFormView();
  }

  function setAlert(message, kind) {
    const el = document.querySelector("#ml-quote-alert");
    if (!(el instanceof HTMLElement)) return;

    el.hidden = !message;
    el.textContent = message;
    el.dataset.kind = kind || "info";
  }

  function getFormValues(form) {
    const fd = new FormData(form);

    const fecha = String(fd.get("fecha_entrega") || "").trim();
    const fechaISO = fecha ? new Date(`${fecha}T00:00:00`).toISOString() : null;

    return {
      nombre_completo: String(fd.get("nombre_completo") || "").trim(),
      correo: String(fd.get("correo") || "").trim(),
      telefono: String(fd.get("telefono") || "").trim(),
      empresa: String(fd.get("empresa") || "").trim(),
      tipo_material: String(fd.get("tipo_material") || "").trim(),
      cantidad_estimada: String(fd.get("cantidad_estimada") || "").trim(),
      fecha_entrega: fechaISO,
      descripcion_proyecto: String(fd.get("descripcion_proyecto") || "").trim(),
    };
  }

  function validate(values) {
    if (!values.nombre_completo) return "Ingresa tu nombre completo.";
    if (!values.correo) return "Ingresa tu correo.";
    if (!values.telefono) return "Ingresa tu teléfono.";
    if (!values.descripcion_proyecto) return "Describe tu proyecto.";
    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    setAlert("", "info");

    const values = getFormValues(form);
    const error = validate(values);
    if (error) {
      setAlert(error, "error");
      return;
    }

    const submit = form.querySelector("button[type='submit']");
    if (submit instanceof HTMLButtonElement) submit.disabled = true;

    try {
      const payload = { ...values };
      if (!payload.empresa) delete payload.empresa;
      if (!payload.tipo_material) delete payload.tipo_material;
      if (!payload.cantidad_estimada) delete payload.cantidad_estimada;
      if (!payload.fecha_entrega) delete payload.fecha_entrega;

      const res = await fetch(`${SUPABASE.url}/rest/v1/contacto_webpage`, {
        method: "POST",
        headers: {
          apikey: SUPABASE.anonKey,
          Authorization: `Bearer ${SUPABASE.anonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Error ${res.status}`);
      }

      form.reset();
      showResultView(
        "success",
        "Cotización enviada",
        "¡Listo! Recibimos tu solicitud. Te contactaremos pronto.",
        { showBack: false }
      );
    } catch (err) {
      setAlert("No se pudo enviar. Revisa tus datos e intenta de nuevo.", "error");
      showResultView(
        "error",
        "No se pudo enviar",
        "Ocurrió un error al enviar la cotización. Intenta de nuevo.",
        { showBack: true }
      );
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      if (submit instanceof HTMLButtonElement) submit.disabled = false;
    }
  }

  function bindQuoteOpeners() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest("a");
      if (!(a instanceof HTMLAnchorElement)) return;

      const href = a.getAttribute("href") || "";
      const isQuote = a.classList.contains("btn--quote") || href.includes("#cotizacion");
      if (!isQuote) return;

      e.preventDefault();
      openModal();

      if (href.includes("#cotizacion")) {
        try {
          history.replaceState(null, "", "#cotizacion");
        } catch {
          // ignore
        }
      }
    });

    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#cotizacion") openModal();
    });
  }

  function init() {
    ensureWhatsAppFab();
    ensureQuoteModal();
    bindQuoteOpeners();

    if (window.location.hash === "#cotizacion") {
      openModal();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
