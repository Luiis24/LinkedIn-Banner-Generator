<div align="center">

# 🎨 LinkedIn Banner Studio

### Diseña tu propio banner de LinkedIn, sin ser diseñador.
Personalízalo en vivo y descárgalo en la medida exacta que usa LinkedIn: **800 × 200 px**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Sin dependencias de build](https://img.shields.io/badge/build-no_necesita-3ddc97?style=for-the-badge)
![Idiomas](https://img.shields.io/badge/idiomas-ES_%7C_EN-4cc2ff?style=for-the-badge)

<br>

<img width="4752" height="1188" alt="linkedin-banner-luis-morales-4752x1188 (1)" src="https://github.com/user-attachments/assets/a188279c-c80a-4a5c-bac8-00ea03a32dd8" />

<sub>Banner de ejemplo exportado directamente desde la herramienta (800 × 200 px).</sub>

</div>

---

## 💡 ¿Por qué existe este proyecto?

Estaba actualizando mi LinkedIn y quería un banner que realmente me representara. Busqué plantillas, pero ninguna me convencía, y no soy experto en herramientas de diseño ni quería quedarme con un banner genérico que cualquiera pudiera tener.

Así que hice lo que mejor sé hacer: **construir una herramienta**. Una página donde cualquier persona pueda armar su banner a su gusto, ver el resultado al instante y descargarlo listo para subir.

---

## ✨ Características

| | Función | Detalle |
|---|---|---|
| 📐 | **Medida exacta de LinkedIn** | Exporta en **800 × 200 px** (relación 4:1). También ofrece 1584 × 396 px para alta resolución. |
| 🖼️ | **Foto de perfil guía** | Pasa el mouse sobre el círculo y sube tu foto para ver cómo quedará todo el conjunto. |
| 🏷️ | **Tecnologías a tu estilo** | Cada una con su propio color; ordénalas arrastrando o con flechas. |
| 🌄 | **Fondo personalizable** | Degradado, color sólido o tu propia imagen, con capa de legibilidad ajustable. |
| 📞 | **Contacto flexible** | Agrega teléfono, correo, LinkedIn, web, ubicación o campos propios, con icono a elección. |
| 🔤 | **Tipografías** | 8 fuentes disponibles para títulos y texto. |
| 🎯 | **Posición del texto** | Viene en la posición recomendada (a la derecha de la foto) y puedes cambiarla o restaurarla con un clic. |
| 🌙 | **Modo oscuro / claro** | Para la interfaz y también para los colores del banner. |
| 🌎 | **Español e inglés** | Cambia de idioma con un botón. |
| 🔒 | **100 % en tu navegador** | Tus fotos y datos no se suben a ningún servidor. |

---

## 📸 Vista de la herramienta

<div align="center">
<img src="assets/screenshot-es-dark.png" alt="Interfaz de LinkedIn Banner Studio en modo oscuro" width="85%">
</div>

---

## 🚀 Cómo usarlo

### Opción 1: abrirlo directamente
1. Descarga o clona el repositorio.
2. Abre `index.html` en tu navegador. No necesitas instalar nada.

```bash
git clone https://github.com/Luiis24/linkedin-banner-studio.git
cd linkedin-banner-studio
# abre index.html con doble clic o con tu servidor local favorito
```

> Se necesita conexión a internet para cargar las fuentes de Google Fonts y la librería `html2canvas`.

### Opción 2: servidor local (opcional)

```bash
npx serve .
# o
python3 -m http.server 8000
```

### Pasos para crear tu banner

1. **Escribe** tu nombre, tu rol y tu estado de disponibilidad.
2. **Añade tus tecnologías** y dales el color que quieras.
3. **Elige el fondo**: degradado, un color o tu propia imagen.
4. **Completa el contacto** y ajusta fuentes y posición del texto.
5. **Sube tu foto** pasando el mouse sobre el círculo, para verificar que nada quede tapado.
6. **Descarga** el PNG y súbelo a LinkedIn.

---

## 📏 Sobre la medida del banner

LinkedIn muestra el banner con un tamaño intrínseco de **800 × 200 px** (relación **4:1**). Internamente el diseño se trabaja sobre un lienzo de 1584 × 396 px, que mantiene la misma proporción, y al exportar se reduce por pasos al tamaño exacto elegido para conservar la nitidez del texto.

| Opción de exportación | Resultado |
|---|---|
| **800 × 200 px** (por defecto) | Medida de LinkedIn |
| **1584 × 396 px** | Alta resolución, misma proporción |

> 💡 **Consejo:** en la app móvil de LinkedIn los bordes del banner pueden recortarse. Por eso la posición de texto recomendada es la más segura.
>
> La foto de perfil del editor es solo una guía visual. Por defecto no se incluye en la imagen exportada, porque LinkedIn coloca tu foto real encima.

---

## 🗂️ Estructura del proyecto

```text
linkedin-banner-studio/
├── index.html      # Estructura de la página
├── styles.css      # Estilos de la interfaz y del banner
├── app.js          # Lógica: edición en vivo, listas ordenables, exportación
├── i18n.js         # Traducciones ES / EN
└── assets/         # Imágenes usadas en este README
```

---

## 🛠️ Tecnologías

- **HTML5, CSS3 y JavaScript** puro, sin frameworks ni proceso de build.
- [**html2canvas**](https://html2canvas.hertzen.com/) para convertir el banner en imagen.
- [**Google Fonts**](https://fonts.google.com/) para las tipografías del banner.
- **Canvas API** para ajustar la imagen al tamaño exacto de exportación.

---

## 🧭 Ideas a futuro

- [ ] Guardar y cargar diseños en un archivo `.json`
- [ ] Plantillas prediseñadas
- [ ] Guías visuales de zonas seguras para móvil y escritorio
- [ ] Más fuentes y formas para los chips
- [ ] Enlace para compartir un diseño

¿Tienes otra idea? ¡Abre un *issue*!

---

## 🤝 Contribuir

Las contribuciones son bienvenidas.

1. Haz un *fork* del proyecto
2. Crea una rama (`git checkout -b mi-mejora`)
3. Haz *commit* de tus cambios (`git commit -m "Agrega mi mejora"`)
4. Haz *push* (`git push origin mi-mejora`)
5. Abre un *Pull Request*

---

## 📄 Licencia

Distribuido bajo licencia **MIT**. Puedes usarlo, modificarlo y compartirlo libremente.

---

## 👤 Autor

**Luis Morales** · Desarrollador Frontend & Full Stack

🌐 [LsMorales.dev](https://lsmorales.dev) · 💻 [github.com/Luiis24](https://github.com/Luiis24) · 📍 Cali, Colombia

<div align="center">

Hecho con ☕ y muchas ganas de que tu perfil se vea como tú.

⭐ Si te sirvió, dale una estrella al repositorio.

</div>

---

<details>
<summary><b>🇬🇧 English summary</b></summary>

<br>

**LinkedIn Banner Studio** is a browser tool to design your own LinkedIn banner without any design skills. Edit live, preview it with a profile-photo guide, and download a PNG at LinkedIn's exact intrinsic size: **800 × 200 px (4:1)**.

**Features:** upload your profile photo by hovering the avatar guide · technology chips with individual colors and drag-and-drop ordering · gradient, solid color or image backgrounds · extra contact fields (phone, email, etc.) · custom fonts · recommended text position with manual override · dark/light mode · Spanish and English interface.

**Quick start:** clone the repo and open `index.html` in your browser. No build step required (internet connection needed for Google Fonts and html2canvas).

</details>
