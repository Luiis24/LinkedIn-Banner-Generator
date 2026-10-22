/* ============================================================
   Estudio de Banner para LinkedIn
   - Lienzo de diseño: 1584 × 396 px (4:1)
   - Exportación: varias resoluciones con relación 4:1
   ============================================================ */
(() => {
  'use strict';

  /* ---------- Constantes ---------- */
  const W = 1584;
  const H = 396;

  const FONTS = ['Space Grotesk', 'Inter', 'Poppins', 'Montserrat', 'Playfair Display', 'Roboto Slab', 'JetBrains Mono', 'Oswald'];
  const ICONS = ['🌐', '💻', '📍', '📞', '📱', '✉️', '💼', '🔗', '💬', '🎓', '⭐', '✨'];
  const CONTACT_TYPES = {
    web:      { icon: '🌐', sample: 'tusitio.dev' },
    github:   { icon: '💻', sample: 'github.com/usuario' },
    location: { icon: '📍', sample: 'Cali, Colombia' },
    phone:    { icon: '📞', sample: '+57 300 000 0000' },
    email:    { icon: '✉️', sample: 'correo@ejemplo.com' },
    linkedin: { icon: '💼', sample: 'linkedin.com/in/usuario' },
    custom:   { icon: '✨', sample: '' }
  };
  const PALETTE = ['#4cc2ff', '#a78bfa', '#3ddc97', '#fbbf24', '#f472b6', '#fb923c', '#38bdf8', '#f87171'];

  const THEMES = {
    dark:  { bg: '#0b1220', bg2: '#121b2e', line: '#243049', tx: '#eef2f9', mut: '#9aa8c2' },
    light: { bg: '#f4f7fc', bg2: '#ffffff', line: '#d3dcec', tx: '#0f1a2e', mut: '#52617c' }
  };

  /* Posición recomendada por la plataforma: a la derecha de la foto, centrado en vertical */
  const RECOMMENDED = { hAlign: 'start', vAlign: 'center', offset: 420 };

  const FLEX = { start: 'flex-start', center: 'center', end: 'flex-end', top: 'flex-start', bottom: 'flex-end' };
  const TEXT_ALIGN = { start: 'left', center: 'center', end: 'right' };

  /* ---------- Utilidades ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const uid = () => Math.random().toString(36).slice(2, 9);

  function h(tag, props = {}, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v === undefined || v === null) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    kids.forEach(kid => el.append(kid));
    return el;
  }

  const hexToRgb = hex => {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r}, ${g}, ${b}, ${a})`; };
  const mix = (hex, other, t) => {
    const a = hexToRgb(hex), b = hexToRgb(other);
    return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };
  const luminance = hex => {
    const [r, g, b] = hexToRgb(hex).map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  /* ---------- Estado ---------- */
  const state = {
    lang: 'es',
    uiTheme: 'dark',

    name: 'Luis Morales',
    subtitle: window.DEFAULT_TEXT.es.subtitle,
    badge: window.DEFAULT_TEXT.es.badge,

    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    accent: '#4cc2ff',
    bannerTheme: 'dark',

    hAlign: RECOMMENDED.hAlign,
    vAlign: RECOMMENDED.vAlign,
    offset: RECOMMENDED.offset,

    bgMode: 'default',        // default | solid | image
    bgColor: '#0b1220',
    bgImage: null,
    bgOverlay: 40,

    avatar: null,
    showAvatar: true,
    includeAvatar: false,
    exportSize: '800',

    chips: [
      { id: uid(), text: 'Angular 17',         color: '#dd0031' },
      { id: uid(), text: 'TypeScript',         color: '#3178c6' },
      { id: uid(), text: 'Java (Spring Boot)', color: '#f89820' },
      { id: uid(), text: 'ASP.NET Core',       color: '#8a63f0' },
      { id: uid(), text: 'SQL Server',         color: '#e04545' },
      { id: uid(), text: 'Docker',             color: '#2496ed' },
      { id: uid(), text: 'REST APIs',          color: '#3ddc97' },
      { id: uid(), text: 'Tailwind CSS',       color: '#38bdf8' }
    ],

    contacts: [
      { id: uid(), icon: '🌐', value: 'LsMorales.dev' },
      { id: uid(), icon: '💻', value: 'github.com/Luiis24' },
      { id: uid(), icon: '📍', value: 'Cali, Colombia' }
    ]
  };

  /* ---------- Preferencias (solo idioma y tema de la interfaz) ---------- */
  function loadPrefs() {
    let p = {};
    try { p = JSON.parse(localStorage.getItem('bannerStudioPrefs') || '{}'); } catch (e) { /* sin acceso */ }
    state.lang = p.lang || ((navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es');
    state.uiTheme = p.uiTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    // Si el idioma inicial es inglés, los textos por defecto también
    if (state.lang === 'en') {
      state.subtitle = window.DEFAULT_TEXT.en.subtitle;
      state.badge = window.DEFAULT_TEXT.en.badge;
    }
  }
  function savePrefs() {
    try { localStorage.setItem('bannerStudioPrefs', JSON.stringify({ lang: state.lang, uiTheme: state.uiTheme })); } catch (e) { /* sin acceso */ }
  }

  /* ---------- i18n ---------- */
  const t = key => (window.I18N[state.lang] && window.I18N[state.lang][key]) || window.I18N.es[key] || key;

  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.title = t('docTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    $('#langBtn').textContent = state.lang === 'es' ? 'EN' : 'ES';
    updateGuideBtn();
    updateAvatarUi();
    updateBgUi();
    updateRecommendedUi();
    fit();
  }

  function setLang(lang) {
    const old = state.lang;
    ['badge', 'subtitle'].forEach(k => {
      if (state[k] === window.DEFAULT_TEXT[old][k]) state[k] = window.DEFAULT_TEXT[lang][k];
    });
    state.lang = lang;
    savePrefs();
    applyI18n();
    syncInputs();
    renderLists();
    renderBanner();
  }

  /* ---------- Referencias DOM ---------- */
  const banner = $('#bannerCanvas');
  const stage = $('#stage');
  const previewHost = $('#previewHost');
  const avatarEl = $('#avatarOverlay');

  /* ---------- Render del banner ---------- */
  function renderBanner() {
    const th = THEMES[state.bannerTheme];
    const s = banner.style;
    s.setProperty('--bg', th.bg);
    s.setProperty('--bg2', th.bg2);
    s.setProperty('--line', th.line);
    s.setProperty('--tx', th.tx);
    s.setProperty('--mut', th.mut);
    s.setProperty('--ac', state.accent);
    s.setProperty('--font-head', `'${state.headingFont}', sans-serif`);
    s.setProperty('--font-body', `'${state.bodyFont}', sans-serif`);

    // Fondo
    const bg = $('#bannerBg');
    const overlay = $('#bannerOverlay');
    overlay.style.background = 'transparent';
    if (state.bgMode === 'solid') {
      bg.style.backgroundColor = state.bgColor;
      bg.style.backgroundImage = 'none';
    } else if (state.bgMode === 'image' && state.bgImage) {
      bg.style.backgroundColor = th.bg;
      bg.style.backgroundImage = `url("${state.bgImage}")`;
      overlay.style.background = th.bg;
      overlay.style.opacity = state.bgOverlay / 100;
    } else {
      bg.style.backgroundColor = th.bg;
      bg.style.backgroundImage =
        `radial-gradient(900px 500px at 85% -10%, ${rgba(state.accent, 0.18)}, transparent), ` +
        `radial-gradient(600px 300px at 15% 110%, ${rgba(state.accent, 0.08)}, transparent)`;
    }

    // Posición del texto
    $('#bannerContent').style.paddingLeft = state.offset + 'px';
    const main = $('#bannerMain');
    main.style.justifyContent = FLEX[state.vAlign];
    main.style.alignItems = FLEX[state.hAlign];
    main.style.textAlign = TEXT_ALIGN[state.hAlign];
    $('#chipsContainer').style.justifyContent = FLEX[state.hAlign];
    $('#footerContainer').style.justifyContent = FLEX[state.hAlign];

    // Textos
    $('#nameText').textContent = state.name;
    $('#subtitleText').textContent = state.subtitle;
    $('#subtitleText').style.display = state.subtitle ? '' : 'none';
    $('#badgeText').textContent = state.badge;
    $('#badgeWrap').style.display = state.badge.trim() ? 'inline-flex' : 'none';

    // Tecnologías (cada una con su color)
    const chipsBox = $('#chipsContainer');
    chipsBox.replaceChildren();
    state.chips.filter(c => c.text.trim()).forEach(c => {
      const textColor = state.bannerTheme === 'dark' ? mix(c.color, '#ffffff', 0.4) : mix(c.color, '#000000', 0.35);
      const chip = h('span', { class: 'chip', text: c.text });
      chip.style.borderColor = rgba(c.color, 0.6);
      chip.style.background = rgba(c.color, state.bannerTheme === 'dark' ? 0.14 : 0.1);
      chip.style.color = textColor;
      chipsBox.append(chip);
    });

    // Contacto
    const footer = $('#footerContainer');
    footer.replaceChildren();
    const filled = state.contacts.filter(c => c.value.trim());
    footer.style.display = filled.length ? 'flex' : 'none';
    filled.forEach((c, i) => {
      const value = h(i === 0 ? 'strong' : 'span', { text: c.value });
      footer.append(h('div', { class: 'footer-item' }, document.createTextNode(c.icon + ' '), value));
    });

    // Foto
    const photo = $('#avatarPhoto');
    photo.style.backgroundImage = state.avatar ? `url("${state.avatar}")` : 'none';
    avatarEl.classList.toggle('has-photo', !!state.avatar);
    avatarEl.style.display = state.showAvatar ? 'flex' : 'none';
    $('#avatarPlaceholder').style.display = state.avatar ? 'none' : '';
  }

  /* ---------- Escala de la vista previa ---------- */
  function fit() {
    const avail = previewHost.clientWidth || W;
    const scale = Math.min(1, avail / W);
    stage.style.width = W * scale + 'px';
    stage.style.height = H * scale + 'px';
    banner.style.transform = `scale(${scale})`;
    $('#zoomLabel').textContent = `${t('scale')}: ${Math.round(scale * 100)}%`;
  }

  /* ---------- Subida de imágenes ---------- */
  function readImage(file, maxW, maxH, type) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) return reject(new Error('notImage'));
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const r = Math.min(1, maxW / img.width, maxH / img.height);
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * r);
        c.height = Math.round(img.height * r);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL(type, 0.92));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('notImage')); };
      img.src = url;
    });
  }
  const typeFor = file => (file.type === 'image/png' ? 'image/png' : 'image/jpeg');

  function updateAvatarUi() {
    $('#avatarUploadText').textContent = state.avatar ? t('changePhoto') : t('uploadPhoto');
    $('#avatarRemove').hidden = !state.avatar;
  }

  function updateGuideBtn() {
    $('#toggleAvatarBtn').textContent = state.showAvatar ? t('toggleGuideHide') : t('toggleGuideShow');
  }

  function updateBgUi() {
    document.querySelectorAll('#bgModes button').forEach(b => b.classList.toggle('active', b.dataset.mode === state.bgMode));
    $('#bgSolidBox').hidden = state.bgMode !== 'solid';
    $('#bgImageBox').hidden = state.bgMode !== 'image';
    $('#btnBgUpload').textContent = state.bgImage ? t('changeBg') : t('uploadBg');
    $('#btnBgRemove').hidden = !state.bgImage;
    $('#overlayVal').textContent = state.bgOverlay + '%';
  }

  function updateRecommendedUi() {
    const isRec = state.hAlign === RECOMMENDED.hAlign && state.vAlign === RECOMMENDED.vAlign && state.offset === RECOMMENDED.offset;
    $('#recTag').hidden = !isRec;
    $('#btnRecommended').hidden = isRec;
    $('#offsetVal').textContent = state.offset + 'px';
  }

  /* ---------- Listas ordenables ---------- */
  function moveItem(arr, from, to) {
    if (to < 0 || to >= arr.length || from === to) return;
    arr.splice(to, 0, arr.splice(from, 1)[0]);
  }

  function attachDnd(listEl, arr, rerender) {
    let dragId = null;
    listEl.querySelectorAll('.row').forEach(row => {
      const handle = row.querySelector('.handle');
      handle.addEventListener('mousedown', () => { row.draggable = true; });
      row.addEventListener('dragstart', e => {
        dragId = row.dataset.id;
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', dragId);
      });
      row.addEventListener('dragend', () => {
        row.draggable = false;
        row.classList.remove('dragging');
        listEl.querySelectorAll('.over').forEach(r => r.classList.remove('over'));
      });
      row.addEventListener('dragover', e => { e.preventDefault(); row.classList.add('over'); });
      row.addEventListener('dragleave', () => row.classList.remove('over'));
      row.addEventListener('drop', e => {
        e.preventDefault();
        const from = arr.findIndex(x => x.id === dragId);
        const to = arr.findIndex(x => x.id === row.dataset.id);
        moveItem(arr, from, to);
        rerender();
      });
    });
  }

  function rowParts(arr, i, rerender) {
    const handle = h('span', { class: 'handle', title: t('drag'), text: '⠿' });
    const up = h('button', { type: 'button', class: 'icon-btn', title: t('moveUp'), 'aria-label': t('moveUp'), text: '▲' });
    const down = h('button', { type: 'button', class: 'icon-btn', title: t('moveDown'), 'aria-label': t('moveDown'), text: '▼' });
    const del = h('button', { type: 'button', class: 'icon-btn danger', title: t('remove'), 'aria-label': t('remove'), text: '✕' });
    up.disabled = i === 0;
    down.disabled = i === arr.length - 1;
    up.addEventListener('click', () => { moveItem(arr, i, i - 1); rerender(); });
    down.addEventListener('click', () => { moveItem(arr, i, i + 1); rerender(); });
    del.addEventListener('click', () => { arr.splice(i, 1); rerender(); });
    return { handle, up, down, del };
  }

  function renderChipList() {
    const list = $('#chipList');
    list.replaceChildren();
    const rerender = () => { renderChipList(); renderBanner(); };
    if (!state.chips.length) list.append(h('div', { class: 'list-empty', text: t('techEmpty') }));
    state.chips.forEach((chip, i) => {
      const color = h('input', { type: 'color', value: chip.color, title: t('chipColor') });
      color.addEventListener('input', () => { chip.color = color.value; renderBanner(); });
      const text = h('input', { type: 'text', class: 'grow', value: chip.text });
      text.addEventListener('input', () => { chip.text = text.value; renderBanner(); });
      const p = rowParts(state.chips, i, rerender);
      list.append(h('div', { class: 'row', 'data-id': chip.id }, p.handle, color, text, p.up, p.down, p.del));
    });
    attachDnd(list, state.chips, rerender);
  }

  function renderContactList() {
    const list = $('#contactList');
    list.replaceChildren();
    const rerender = () => { renderContactList(); renderBanner(); };
    if (!state.contacts.length) list.append(h('div', { class: 'list-empty', text: t('contactEmpty') }));
    state.contacts.forEach((c, i) => {
      const icon = h('select', { class: 'icon-select', title: t('iconTitle') });
      const icons = ICONS.includes(c.icon) ? ICONS : [c.icon, ...ICONS];
      icons.forEach(ic => icon.append(h('option', { value: ic, text: ic })));
      icon.value = c.icon;
      icon.addEventListener('change', () => { c.icon = icon.value; renderBanner(); });
      const value = h('input', { type: 'text', class: 'grow', value: c.value, placeholder: t('contactPlaceholder') });
      value.addEventListener('input', () => { c.value = value.value; renderBanner(); });
      const p = rowParts(state.contacts, i, rerender);
      list.append(h('div', { class: 'row', 'data-id': c.id }, p.handle, icon, value, p.up, p.down, p.del));
    });
    attachDnd(list, state.contacts, rerender);
  }

  function renderLists() { renderChipList(); renderContactList(); }

  /* ---------- Sincronizar inputs con el estado ---------- */
  function syncInputs() {
    $('#inputName').value = state.name;
    $('#inputSubtitle').value = state.subtitle;
    $('#inputBadge').value = state.badge;
    $('#selHeadingFont').value = state.headingFont;
    $('#selBodyFont').value = state.bodyFont;
    $('#inputAccent').value = state.accent;
    $('#selBannerTheme').value = state.bannerTheme;
    $('#selH').value = state.hAlign;
    $('#selV').value = state.vAlign;
    $('#inputOffset').value = state.offset;
    $('#inputBgColor').value = state.bgColor;
    $('#inputOverlay').value = state.bgOverlay;
    $('#chkIncludeAvatar').checked = state.includeAvatar;
    $('#selExportSize').value = state.exportSize;
  }

  function applyUiTheme() {
    document.documentElement.dataset.ui = state.uiTheme;
    $('#themeBtn').textContent = state.uiTheme === 'dark' ? '☀️' : '🌙';
  }

  /* ---------- Eventos ---------- */
  function bindEvents() {
    // Idioma y tema de la interfaz
    $('#langBtn').addEventListener('click', () => setLang(state.lang === 'es' ? 'en' : 'es'));
    $('#themeBtn').addEventListener('click', () => {
      state.uiTheme = state.uiTheme === 'dark' ? 'light' : 'dark';
      applyUiTheme();
      savePrefs();
    });

    // Textos
    $('#inputName').addEventListener('input', e => { state.name = e.target.value; renderBanner(); });
    $('#inputSubtitle').addEventListener('input', e => { state.subtitle = e.target.value; renderBanner(); });
    $('#inputBadge').addEventListener('input', e => { state.badge = e.target.value; renderBanner(); });

    // Fuentes (selects)
    ['#selHeadingFont', '#selBodyFont'].forEach(sel => {
      const select = $(sel);
      FONTS.forEach(f => select.append(h('option', { value: f, text: f })));
    });
    $('#selHeadingFont').addEventListener('change', e => { state.headingFont = e.target.value; renderBanner(); });
    $('#selBodyFont').addEventListener('change', e => { state.bodyFont = e.target.value; renderBanner(); });

    // Color y tema del banner
    $('#inputAccent').addEventListener('input', e => { state.accent = e.target.value; renderBanner(); });
    $('#selBannerTheme').addEventListener('change', e => { state.bannerTheme = e.target.value; renderBanner(); });

    // Posición del texto
    $('#selH').addEventListener('change', e => { state.hAlign = e.target.value; updateRecommendedUi(); renderBanner(); });
    $('#selV').addEventListener('change', e => { state.vAlign = e.target.value; updateRecommendedUi(); renderBanner(); });
    $('#inputOffset').addEventListener('input', e => { state.offset = Number(e.target.value); updateRecommendedUi(); renderBanner(); });
    $('#btnRecommended').addEventListener('click', () => {
      Object.assign(state, { hAlign: RECOMMENDED.hAlign, vAlign: RECOMMENDED.vAlign, offset: RECOMMENDED.offset });
      syncInputs(); updateRecommendedUi(); renderBanner();
    });

    // Fondo
    document.querySelectorAll('#bgModes button').forEach(btn => {
      btn.addEventListener('click', () => { state.bgMode = btn.dataset.mode; updateBgUi(); renderBanner(); });
    });
    $('#inputBgColor').addEventListener('input', e => {
      state.bgColor = e.target.value;
      // Ajusta el color del texto según la luminosidad del fondo elegido
      state.bannerTheme = luminance(state.bgColor) > 0.45 ? 'light' : 'dark';
      $('#selBannerTheme').value = state.bannerTheme;
      renderBanner();
    });
    $('#btnBgUpload').addEventListener('click', () => $('#bgFile').click());
    $('#bgFile').addEventListener('change', async e => {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file) return;
      try {
        state.bgImage = await readImage(file, 3168, 3168, typeFor(file));
        state.bgMode = 'image';
        updateBgUi(); renderBanner();
      } catch (err) { alert(t('notImage')); }
    });
    $('#btnBgRemove').addEventListener('click', () => { state.bgImage = null; updateBgUi(); renderBanner(); });
    $('#inputOverlay').addEventListener('input', e => {
      state.bgOverlay = Number(e.target.value);
      $('#overlayVal').textContent = state.bgOverlay + '%';
      renderBanner();
    });

    // Foto de perfil (clic sobre el círculo, visible al pasar el mouse)
    const openPicker = () => $('#avatarFile').click();
    avatarEl.addEventListener('click', openPicker);
    avatarEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker(); }
    });
    $('#avatarRemove').addEventListener('click', e => {
      e.stopPropagation();
      state.avatar = null;
      updateAvatarUi(); renderBanner();
    });
    $('#avatarFile').addEventListener('change', async e => {
      const file = e.target.files[0];
      e.target.value = '';
      if (!file) return;
      try {
        state.avatar = await readImage(file, 800, 800, typeFor(file));
        state.showAvatar = true;
        updateAvatarUi(); updateGuideBtn(); renderBanner();
      } catch (err) { alert(t('notImage')); }
    });
    $('#toggleAvatarBtn').addEventListener('click', () => { state.showAvatar = !state.showAvatar; updateGuideBtn(); renderBanner(); });
    $('#chkIncludeAvatar').addEventListener('change', e => { state.includeAvatar = e.target.checked; });

    // Tecnologías
    const addChips = () => {
      const input = $('#inputNewChip');
      input.value.split(',').map(s => s.trim()).filter(Boolean).forEach(text => {
        state.chips.push({ id: uid(), text, color: PALETTE[state.chips.length % PALETTE.length] });
      });
      input.value = '';
      renderChipList(); renderBanner();
    };
    $('#btnAddChip').addEventListener('click', addChips);
    $('#inputNewChip').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addChips(); } });

    // Contacto
    $('#btnAddContact').addEventListener('click', () => {
      const type = $('#selNewContact').value;
      state.contacts.push({ id: uid(), icon: CONTACT_TYPES[type].icon, value: CONTACT_TYPES[type].sample });
      renderContactList(); renderBanner();
    });

    // Exportación
    $('#selExportSize').addEventListener('change', e => { state.exportSize = e.target.value; });
    $('#downloadBtn').addEventListener('click', exportBanner);

    // Escala responsive
    if (window.ResizeObserver) new ResizeObserver(fit).observe(previewHost);
    window.addEventListener('resize', fit);
  }

  /* ---------- Exportación a PNG (resoluciones con relación 4:1) ---------- */
  function resizeStep(src, w, h2) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h2;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(src, 0, 0, w, h2);
    return c;
  }

  // Reduce a la medida exacta en pasos (mitades) para conservar nitidez
  function resizeExact(src, w, h2) {
    let cur = src;
    while (cur.width / 2 >= w) cur = resizeStep(cur, Math.round(cur.width / 2), Math.round(cur.height / 2));
    return resizeStep(cur, w, h2);
  }

  async function ensureFonts() {
    try {
      await Promise.all([
        document.fonts.load(`700 46px "${state.headingFont}"`),
        document.fonts.load(`600 23px "${state.headingFont}"`),
        document.fonts.load(`500 14px "${state.bodyFont}"`)
      ]);
      await document.fonts.ready;
    } catch (e) { /* se usará la fuente de respaldo */ }
  }

  async function exportBanner() {
    const btn = $('#downloadBtn');
    const label = $('#downloadLabel');
    btn.disabled = true;
    label.textContent = t('generating');
    let clone = null;
    try {
      await ensureFonts();

      // Copia fuera de pantalla, sin escala y sin controles de edición
      clone = banner.cloneNode(true);
      clone.removeAttribute('id');
      clone.style.transform = 'none';
      clone.style.position = 'fixed';
      clone.style.left = '-10000px';
      clone.style.top = '0';
      clone.querySelectorAll('.avatar-hover, .avatar-placeholder').forEach(el => el.remove());
      const av = clone.querySelector('.avatar');
      if (state.includeAvatar && state.avatar) av.style.display = 'flex';
      else av.remove();
      document.body.appendChild(clone);

      const outW = Number(state.exportSize);
      const outH = outW / 4;
      const canvas = await html2canvas(clone, {
        scale: Math.max(2, outW / W),
        width: W,
        height: H,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        logging: false,
        backgroundColor: THEMES[state.bannerTheme].bg
      });

      const out = resizeExact(canvas, outW, outH);

      const blob = await new Promise(res => out.toBlob(res, 'image/png'));
      const slug = (state.name || 'banner').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'banner';
      const a = document.createElement('a');
      a.download = `linkedin-banner-${slug}-${outW}x${outH}.png`;
      a.href = URL.createObjectURL(blob);
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (err) {
      console.error(err);
      alert(t('exportError'));
    } finally {
      if (clone) clone.remove();
      btn.disabled = false;
      label.textContent = t('download');
    }
  }

  /* ---------- Arranque ---------- */
  function init() {
    loadPrefs();
    bindEvents();
    applyUiTheme();
    syncInputs();
    applyI18n();
    renderLists();
    renderBanner();
    fit();
  }
  init();
})();
