# CD STUDIO — Plan maestro para actualizar el portafolio web existente

> **Tipo de documento:** especificación funcional, visual y técnica para ejecutar sobre un proyecto ya construido.  
> **Versión:** 1.0 · 14 de octubre de 2026  
> **Marca:** CD STUDIO  
> **Descriptor:** Software Design & Development  
> **Eslogan oficial:** **Software con precisión y visión.**  
> **Estado:** instrucciones de implementación; requiere inspeccionar el repositorio actual antes de tocar código.

---

## 0. Instrucción principal para quien implemente

**Actualizar el portafolio existente; NO crear uno nuevo ni reemplazar su arquitectura sin justificación.** Primero inspeccionar el código, rutas, componentes, dependencias, estilos, contenido y despliegue. Conservar toda funcionalidad útil, proyectos reales, enlaces, SEO existente y características operativas. Aplicar la identidad oficial de **CD STUDIO** de manera progresiva, conservando las convenciones técnicas actuales.

El portafolio debe comunicar simultáneamente:

1. **Presente:** la identidad profesional de un desarrollador de software, sus habilidades y sus proyectos verificables.
2. **Futuro:** la visión de **CD STUDIO** como estudio/empresa tecnológica, **sin presentarlo como una empresa formalmente constituida, un equipo numeroso o una cartera de clientes si aún no corresponde a la realidad**.

**Fuente de verdad de los activos:** el *Kit Maestro CD STUDIO v1.0* aprobado. El monograma oficial es **B.3 corregido**, con la **C y la D entrelazadas mediante espacio negativo**. Importar el SVG maestro exactamente como está; **no redibujar, reinventar, recrear con texto o generar un símbolo parecido**. Revisar que todas las variantes visibles correspondan al mismo B.3.

### Entregable esperado

Una actualización completa y publicable del portafolio actual, con branding CD STUDIO, diseño responsive, navegación usable, contenido honesto, accesibilidad, SEO técnico proporcional al stack existente y pruebas. Acompañar los cambios con un resumen de archivos editados, decisiones y pendientes.

---

## 1. Identidad de marca aprobada (no modificar)

| Elemento | Definición oficial | Uso |
|---|---|---|
| Nombre | **CD STUDIO** | Marca principal |
| Tipo | Marca personal con proyección a estudio de software | Posicionamiento |
| Dirección | **Precision Tech Premium** | Sobria, elegante, técnica, confiable |
| Monograma | **B.3 corregido** | SVG maestro, sin alteraciones |
| Sistema de logo | **Monograma + wordmark** | Marca principal horizontal |
| Descriptor | **Software Design & Development** | Institucional, opcional en tamaños pequeños |
| Eslogan | **Software con precisión y visión.** | Hero, presentación y piezas importantes |
| Títulos | **Space Grotesk** | Marca y titulares |
| Cuerpo/UI | **Inter** | Navegación, contenido y controles |
| Iconografía | **Lucide** o equivalente lineal existente | Trazos consistentes |

### 1.1 Paleta oficial

| Token de marca | HEX | Aplicación |
|---|---|---|
| Azul noche | `#0F172A` | Fondo oscuro, encabezado y marca |
| Azul precisión | `#1D4ED8` | Botón primario, enlaces y acentos sobre fondos claros |
| Azul acero | `#334155` | Texto secundario sobre fondos claros, divisores |
| Gris hielo | `#E2E8F0` | Bordes, contenedores, áreas neutras |
| Blanco | `#FFFFFF` | Superficies y texto en fondos oscuros |

**Proporción orientativa:** 60 % neutros claros, 30 % azul noche y 10 % azul precisión. En hero y secciones oscuras esta distribución puede invertirse. **En azul noche no usar `#1D4ED8` para textos pequeños**; para textos de acento en fondo oscuro usar un azul más claro derivado de la marca, como `#93C5FD`, únicamente como token de accesibilidad/UI, no como nuevo color principal de marca.

### 1.2 Tokens CSS de referencia

Adaptar los nombres a los tokens existentes en el proyecto; evitar duplicar sistemas incompatibles.

```css
:root {
  /* Brand — identidad aprobada */
  --brand-navy: #0f172a;
  --brand-blue: #1d4ed8;
  --brand-steel: #334155;
  --brand-ice: #e2e8f0;
  --brand-white: #ffffff;

  /* Semánticos derivados — interfaz */
  --surface: #ffffff;
  --surface-muted: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #334155;
  --border-subtle: #e2e8f0;
  --action-primary: #1d4ed8;
  --action-primary-text: #ffffff;
  --text-on-dark: #ffffff;
  --text-muted-on-dark: #cbd5e1;
  --accent-on-dark: #93c5fd;

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --radius-control: 10px;
  --radius-card: 16px;
  --radius-pill: 999px;
  --container-width: 1200px;
  --focus-outline: 3px solid #93c5fd;
}
```

**Nota técnica:** el Kit Maestro previo incluía PNG del wordmark con una fuente alternativa; priorizar los vectores correctos del monograma y comprobar **Space Grotesk** en el wordmark antes de publicar la composición final. Si se requiere fidelidad tipográfica absoluta en SVG, usar una versión maestra con contornos convertidos legalmente a trazados, manteniendo otra editable.

### 1.3 Reglas de diseño

- Jerarquía sobria; espacios generosos, grilla consistente y contraste alto.
- Títulos con Space Grotesk; textos, botones, navegación y metadatos con Inter.
- Bordes redondeados moderados, sin estética excesivamente infantil ni efectos neón exagerados.
- Sombras discretas, líneas finas, geometría modular y patrones de conexión como recursos secundarios.
- Animaciones leves, funcionales y compatibles con `prefers-reduced-motion`.
- Iconos Lucide con tamaño/grosor consistente (habitualmente 18–22 px, según contexto).
- El monograma B.3 debe verse igual en encabezado, favicon, pie y publicaciones.

---

## 2. Auditoría obligatoria del proyecto ANTES de modificarlo

**No asumir framework, estructura de carpetas, sistema de rutas ni servicios externos.** Levantar un diagnóstico primero.

### 2.1 Relevar el proyecto

- [ ] Identificar framework/lenguaje, bundler, versión de Node o runtime y gestor de paquetes.
- [ ] Inventariar rutas/páginas, componentes, layouts, estilos, breakpoints y modo oscuro existente.
- [ ] Identificar cómo se cargan proyectos, fotografías, publicaciones, CV y datos de contacto (hardcoded, JSON, CMS, API).
- [ ] Localizar metaetiquetas, OG, favicon, robots, sitemap, analytics y formularios.
- [ ] Detectar librerías reutilizables, dependencias sin uso y estilos duplicados.
- [ ] Revisar enlaces existentes, navegación móvil, imágenes y estados de error/carga.
- [ ] Documentar SEO y rendimiento actuales antes de intervenir.
- [ ] Registrar lo que se conservará, se refactorizará y se eliminará justificadamente.
- [ ] Crear una rama Git de trabajo y establecer un punto de retorno.

### 2.2 Resultado de auditoría (completar en repositorio)

| Campo | Valor real a registrar |
|---|---|
| Repositorio / rama | `[COMPLETAR]` |
| Stack | `[COMPLETAR]` |
| Rutas actuales | `[COMPLETAR]` |
| Estado del deploy | `[COMPLETAR]` |
| Ubicación de assets | `[COMPLETAR]` |
| Componentes reutilizables | `[COMPLETAR]` |
| Deudas técnicas detectadas | `[COMPLETAR]` |
| Dependencias no modificables sin permiso | `[COMPLETAR]` |

### 2.3 Restricciones de migración

- No recrear el proyecto, cambiar de framework, adoptar nuevas bibliotecas masivas ni migrar la base de datos por estética.
- No borrar trabajos, contenido útil, estadísticas reales o rutas indexadas sin una decisión documentada.
- No introducir múltiples librerías que resuelvan lo mismo.
- No exponer tokens, claves de API, datos personales o credenciales al cliente.
- No sustituir assets oficiales por emojis, imágenes aproximadas o monogramas dibujados de nuevo.
- Mantener responsive y funcionalidades existentes durante cada iteración.

---

## 3. Arquitectura de información recomendada

**Preferencia:** reutilizar las páginas y el patrón de navegación actual; reorganizar contenido solamente donde mejore la comprensión.

| Sección | Objetivo | CTA/acción | Prioridad |
|---|---|---|---|
| Inicio / Hero | Presentar marca, especialidad y propuesta de valor | `Ver proyectos`, `Contáctame` | P0 |
| Sobre mí / Sobre CD STUDIO | Separar perfil del fundador y visión del estudio | `Conocer mi trayectoria` | P0 |
| Proyectos destacados | Mostrar evidencias reales de trabajo | `Ver caso de estudio` / `Ver código` | P0 |
| Tecnologías / Capacidades | Mostrar stack comprobable por grupos | — | P1 |
| Servicios (si ya los ofrece) | Precisar lo que realmente puede entregar | `Consultar proyecto` | P1 |
| Proceso de trabajo | Comunicar método, no promesas vacías | — | P2 |
| Experiencia / Formación | Acreditar trayectoria verificable | `Ver CV` | P1 |
| Contacto | Facilitar conversaciones profesionales | `Enviar mensaje` / email / enlace | P0 |
| Footer | Navegación secundaria, marca, redes | GitHub, LinkedIn, email | P0 |

Si el sitio actual es **one-page**, mantenerlo cuando sea suficiente y usar anclas (`#proyectos`, `#sobre-mi`, `#contacto`). Si ya tiene rutas, conservarlas y asegurar URLs estables. No abrir páginas nuevas por el simple hecho de hacerlo.

### 3.1 Navegación principal

- Izquierda: símbolo **B.3 + CD STUDIO**, enlaza al inicio.
- En escritorio: `Inicio · Proyectos · Sobre mí · Tecnologías · Contacto` (Servicios si corresponde).
- CTA destacado: `Hablemos` o `Contáctame`.
- En móvil: botón de menú accesible, navegación operable con teclado y cierre al seleccionar destino.
- Header sticky opcional: utilizarlo solo si no tapa títulos/anclas ni reduce demasiado el espacio de lectura.

---

## 4. Especificación por sección

### 4.1 Hero: primera impresión

**Contenido aprobado:**

- Eyebrow: `SOFTWARE DESIGN & DEVELOPMENT`
- H1: `Software con precisión y visión.`
- Subtítulo sugerido: `Diseño y desarrollo soluciones digitales modernas, funcionales y escalables, combinando ingeniería de software, claridad y una experiencia de usuario cuidada.`
- CTA primario: `Ver proyectos`
- CTA secundario: `Contáctame`
- Elemento visual: composición **auténtica** con monograma B.3 / forma modular / capturas reales de proyectos. No reemplazar por una marca distinta.

**UX:** título legible sin texto minúsculo, CTA visible arriba del pliegue en pantallas comunes, sin carruseles obligatorios ni animaciones pesadas. Sobre fondos navy usar blanco y un azul claro legible para enfatizar; azul `#1D4ED8` como botón puede requerir separador/contraste contextual y siempre texto blanco.

### 4.2 Sobre mí y visión empresarial

Utilizar dos bloques que convivan sin crear confusión:

**Sobre mí (voz personal):**

> Soy desarrollador de software y creador de CD STUDIO. Me interesa construir soluciones digitales que combinen buenas prácticas de ingeniería, diseño funcional y una visión de crecimiento a largo plazo. En este portafolio comparto mis proyectos, aprendizajes y evolución profesional.

**Sobre CD STUDIO (visión de marca):**

> CD STUDIO nace como una marca personal orientada al diseño y desarrollo de software, con la visión de evolucionar hacia un estudio tecnológico especializado en productos y soluciones digitales.

No presentar un equipo, oficinas físicas, certificaciones, años de experiencia, clientes ni cifras que no hayan sido comprobados.

### 4.3 Proyectos

Cada tarjeta debe contener, si existe información real:

1. Nombre y categoría (web, móvil, sistema, automatización, IA, etc.).
2. Descripción breve del problema o necesidad.
3. Captura representativa optimizada.
4. Tecnologías realmente utilizadas.
5. Rol personal en el proyecto y responsabilidades.
6. Enlace a demo/repo solo si está disponible y permitido.
7. Estado real: desarrollado / prototipo / en progreso (no inventar métricas).

En las páginas de detalle, preferir el formato de **caso de estudio**: contexto → reto → objetivos → diseño/arquitectura → implementación → pruebas → resultados verificables → aprendizajes. Si un proyecto es confidencial, publicar solo un resumen autorizado.

**Ejemplo de esquema de datos adaptable (no imponerlo si ya existe otro):**

```ts
type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'web' | 'mobile' | 'system' | 'ai' | 'other';
  technologies: string[];
  coverImage: string;
  role?: string;
  status?: 'completed' | 'in-progress' | 'prototype';
  repoUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
};
```

**Filtros:** implementar por tecnología o tipo **solo si** la cantidad de proyectos lo amerita. Cuando no haya resultados, indicar el estado vacío con una opción clara para restablecer filtros.

### 4.4 Tecnologías y habilidades

- Agrupar por categorías: Frontend, Backend, Bases de datos, Herramientas/DevOps, Móvil/IA **según habilidades reales**.
- Priorizar claridad y proyectos asociados, no una pared de iconos.
- Evitar porcentajes ficticios de dominio (90 % React, etc.).
- No afirmar experiencia profesional por el mero hecho de haber usado una tecnología en clase.

### 4.5 Servicios (opcional y honesto)

Mostrar exclusivamente capacidades que el usuario realmente pueda ofrecer:

- Desarrollo de aplicaciones web.
- Desarrollo de sistemas a medida.
- Integración de APIs y bases de datos.
- Mejoras de UI/UX e interfaces frontend.
- Mantenimiento y evolución de software.

Cada servicio debe explicar **para quién**, **qué incluye** y **qué no incluye**, con lenguaje comprensible. Si todavía no hay oferta comercial activa, renombrar la sección como **«Áreas de trabajo»** o **«Qué desarrollo»**.

### 4.6 Contacto

- Mostrar al menos un canal verificable: email real o perfil de contacto.
- Enlaces externos válidos, sin URL de ejemplo publicada.
- Si existe formulario: estados de validación, enviando, éxito y error; antispam razonable; controles de abuso del lado del servidor/proveedor.
- Enlace de email: `mailto:` solo con una dirección real.
- No recopilar datos innecesarios ni presentar una aceptación de privacidad ficticia.
- Enviar mensajes realmente antes de afirmar “Mensaje enviado”.

### 4.7 Footer

Monograma pequeño B.3, `CD STUDIO`, eslogan o descriptor (uno de los dos según espacio), enlace a proyectos, contacto, GitHub y LinkedIn. Año actualizado automáticamente **solo si el contexto lo requiere**. Si corresponde, enlace real de privacidad.

---

## 5. Aplicación del sistema visual al UI/UX

### 5.1 Diseño y espaciamiento

- Contenedor responsive con máximo de **1200 px aprox.** y márgenes laterales fluidos.
- Retícula de 4/8 px en espaciado, con secciones aireadas.
- Escala orientativa: `8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` px.
- Ancho de lectura óptimo para párrafos: 60–75 caracteres aprox.
- Tarjetas: bordes sutiles, radio moderado y hover discreto sin desplazar el layout.
- Separar proyectos, información profesional y CTA de contacto con contraste visual, no con adornos excesivos.

### 5.2 Jerarquía tipográfica responsive

| Elemento | Desktop sugerido | Móvil sugerido |
|---|---:|---:|
| H1 | `clamp(2.5rem, 5vw, 4rem)` | escala fluida |
| H2 | `clamp(1.8rem, 3vw, 2.75rem)` | escala fluida |
| H3 | `1.25–1.5rem` | `1.125–1.375rem` |
| Cuerpo | `1rem–1.125rem` | mínimo práctico `1rem` |
| Metadatos | `0.875rem` | `0.875rem` cuando sean relevantes |

Espaciado de línea: cuerpo 1.5–1.7, títulos más compactos. No usar mayúsculas espaciadas para párrafos largos.

### 5.3 Componentes comunes que se deben unificar

- `SiteHeader` / navegación móvil.
- `BrandLogo` reutilizando el SVG maestro.
- `SectionHeading`.
- `ProjectCard`.
- `TechnologyBadge`.
- `PrimaryButton` / `SecondaryButton`.
- `ContactBlock` o formulario existente.
- `SiteFooter`.

Usar nombres, componentes y carpetas del proyecto actual siempre que sea posible. **No duplicar componentes similares**.

### 5.4 Estados interactivos

Definir y comprobar `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading` y `error` cuando correspondan. Un enlace no debe simular un botón inactivo; un botón de acción debe hacer algo útil.

---

## 6. Integración correcta del logo y demás assets

1. Localizar el Kit Maestro v1.0 real. Identificar el archivo vectorial aprobado del **monograma B.3** y su logo horizontal correspondiente.
2. Verificar que el archivo corresponde visualmente al B.3 corregido. **Si el SVG no coincide, detener esa integración en vez de sustituirlo por otro símbolo**; documentar la discrepancia.
3. Guardar las versiones finales en la carpeta estática ya utilizada por el proyecto; por ejemplo, `public/brand/` **solo si la estructura actual lo permite**.
4. Header: logo horizontal con SVG, tamaño cómodo y variante adecuada al fondo.
5. Móvil: logo completo cuando quepa; monograma en ubicaciones realmente pequeñas.
6. Footer: misma silueta, variante de contraste correspondiente.
7. Favicon: ICO/PNG/SVG exportados de la misma fuente; probar en pestañas y acceso directo.
8. `og:image`: preparar una composición de **1200 × 630 px** con marca y texto legible, usando archivo real, no solo una referencia visual.
9. SVG decorativos: aplicar `aria-hidden="true"`; SVG que identifique la marca: proporcionar nombre accesible (por ejemplo, `CD STUDIO — Inicio`).
10. Conservar las proporciones, margen de seguridad, colores y orientación del logo; no agregar filtros o sombras no aprobadas.

**No crear SVG a partir de capturas rasterizadas ni suplantar la versión vectorial por recortes de mockups.**

---

## 7. Diseño responsive y experiencia móvil

### Anchos de prueba recomendados

`320`, `375`, `390`, `768`, `1024`, `1280`, `1440` px, además de un dispositivo móvil real si está disponible.

### Criterios mínimos

- [ ] Sin scroll horizontal accidental.
- [ ] Logo visible y sin deformaciones.
- [ ] Menú móvil que abre, cierra y permite navegar.
- [ ] Tipografía legible sin zoom.
- [ ] Botones y enlaces con áreas táctiles suficientemente amplias (objetivo cómodo: ~44 × 44 px cuando proceda).
- [ ] Hero adaptado a móvil, sin desperdiciar el primer pliegue.
- [ ] Grid de proyectos: 1 columna móvil, 2 tablet, 2–3 desktop según espacio real.
- [ ] Imágenes sin recortes de contenido importante.
- [ ] Formularios/CTA utilizables con teclado móvil.
- [ ] Evitar hover como única forma de descubrir enlaces o información.
- [ ] Revisar el modo horizontal y la orientación del dispositivo.

---

## 8. Accesibilidad: objetivo WCAG 2.2 AA

- Usar HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Un H1 principal por vista; títulos jerárquicos y anclas descriptivas.
- Agregar `skip link` para saltar al contenido.
- Navegación por teclado sin trampas, orden de foco lógico, indicador `:focus-visible` claramente visible.
- Contraste de texto mínimo objetivo **4.5:1** (texto normal) y **3:1** para texto grande; contrastes de componentes y estados según corresponda.
- Alt descriptivo para imágenes informativas; `alt=""` para imágenes puramente decorativas.
- Botones de menú y acordeones con nombre accesible y `aria-expanded` actualizado.
- Errores de formularios vinculados con los campos; mensajes de estado anunciados cuando aplique.
- Animaciones desactivables o reducidas cuando `prefers-reduced-motion: reduce`.
- No depender solamente del color para comunicar errores/estados.
- Pruebas con teclado, zoom al 200 %, navegación táctil y lector de pantalla cuando sea posible.

Ejemplo de foco:

```css
:where(a, button, input, textarea, select):focus-visible {
  outline: var(--focus-outline);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. SEO y metadatos

**Aplicar según el framework actual; no imponer un paquete SEO incompatible.**

- [ ] Un `<title>` descriptivo y único por ruta indexable.
- [ ] `meta description` específica, no lista genérica de keywords.
- [ ] Canonical absoluta que apunte al **dominio verificado y real**.
- [ ] Open Graph / Twitter Card con imagen propia exportada del kit.
- [ ] Favicon y `theme-color` correctos.
- [ ] `lang="es"` (o idioma real de la página).
- [ ] `robots.txt` y `sitemap.xml` **si aplica**, sin bloquear accidentalmente el sitio.
- [ ] Enlaces internos descriptivos, jerarquía de headings consistente y texto indexable.
- [ ] En proyectos, títulos, descripciones e imágenes alt relevantes.
- [ ] Si se usa client-side rendering, comprobar que el contenido importante y metadatos sean rastreables; evaluar SSR/prerender **solo si la auditoría identifica una necesidad real**.
- [ ] Datos estructurados JSON-LD únicamente con información verdadera; elegir `Person`, `WebSite` u `Organization` según corresponda y no declarar empresa formal si no lo es.

**Copy sugerido para home:**

- `title`: `CD STUDIO | Desarrollo de software con precisión y visión`
- `description`: `Portafolio de desarrollo de software y proyectos digitales de CD STUDIO. Ingeniería, diseño funcional y soluciones construidas con precisión y visión.`

Las URLs deben completar variables reales como `[URL_REAL_DEL_SITIO]`; no publicar `cdstudio.dev` o enlaces de ejemplo sin comprobar propiedad/disponibilidad.

---

## 10. Rendimiento y calidad técnica

### Metas de referencia (datos de campo cuando estén disponibles)

- LCP: **≤ 2.5 s**.
- INP: **≤ 200 ms**.
- CLS: **≤ 0.1**.

Estos son umbrales de Core Web Vitals para la experiencia real (percentil 75); no garantizan una puntuación específica en Lighthouse.

### Acciones

- Convertir imágenes pesadas a formatos modernos (WebP/AVIF cuando soporte y flujo lo permitan).
- Declarar `width` y `height` o `aspect-ratio` para evitar desplazamientos.
- Lazy loading para imágenes fuera del primer pliegue; **no** retrasar innecesariamente la imagen LCP del hero.
- Precargar solo fuentes o recursos críticos medidos, evitando preloads excesivos.
- Subconjuntos y pesos necesarios de Space Grotesk e Inter; `font-display: swap` o estrategia medida.
- Revisar bundle JavaScript, árboles de dependencias y carga diferida cuando mejore métricas.
- Evitar vídeos autoejecutables, fondos pesados y animaciones constantes en el hero.
- Reducir dependencias de terceros y respetar privacidad.
- Optimizar cacheado de recursos estáticos conforme a hosting.

---

## 11. Seguridad, privacidad y mantenimiento

- Conservar secretos únicamente en entorno servidor o configuración de despliegue, nunca en el frontend público.
- Validar entradas del formulario tanto en cliente como en servidor/proveedor.
- Usar HTTPS, revisar enlaces externos (`rel="noopener noreferrer"` en `target="_blank"` donde proceda).
- Añadir protección antispam proporcional, sin dificultar el contacto.
- Política de privacidad real si se recogen datos personales o se integran analíticas que la requieran; asesoramiento legal local si corresponde.
- Actualizar dependencias vulnerables según el diagnóstico, con pruebas de regresión.
- No exponer dirección física, teléfono o datos sensibles sin autorización explícita.
- Si hay CMS, revisar permisos y medidas básicas de seguridad.

---

## 12. Estrategia de implementación por etapas

### Etapa 0 — Auditoría y línea base (obligatoria)

- [ ] Inventariar código, rutas, contenido, assets, dependencias y despliegue.
- [ ] Capturar estado visual y métricas antes de editar.
- [ ] Confirmar ubicación del Kit Maestro y el SVG oficial B.3.
- [ ] Listar cambios y riesgos por componente.

**Salida:** reporte de diagnóstico y mapa de archivos.

### Etapa 1 — Branding y estilos base (P0)

- [ ] Incorporar SVG y favicon oficiales; sustituir versiones antiguas.
- [ ] Configurar Space Grotesk / Inter con fuentes/licencias válidas.
- [ ] Crear/adaptar tokens de color, tipografía, espaciado y foco.
- [ ] Actualizar header/footer y tema según la estructura existente.
- [ ] Comprobar que ningún logotipo cambia de silueta entre secciones.

**Salida:** identidad consistente, sin regresiones funcionales.

### Etapa 2 — Estructura y contenido (P0)

- [ ] Actualizar hero al mensaje oficial.
- [ ] Reorganizar «Sobre mí» y visión de CD STUDIO sin falsear situación empresarial.
- [ ] Actualizar tarjetas y vistas de proyectos con datos existentes reales.
- [ ] Revisar CTA y contacto.
- [ ] Adaptar tecnologías y servicios (si procede).

**Salida:** contenido alineado con la nueva marca.

### Etapa 3 — UI/UX y responsive (P1)

- [ ] Unificar botones, badges, tarjetas y headings.
- [ ] Ajustar espaciado y jerarquía responsive.
- [ ] Revisar menú móvil y estados interactivos.
- [ ] Implementar accesibilidad básica y `reduced-motion`.

**Salida:** experiencia consistente en escritorio, tablet y móvil.

### Etapa 4 — SEO, rendimiento y pruebas (P1)

- [ ] Actualizar metadata y OG con dominio real.
- [ ] Optimizar imágenes/fuentes y corregir CLS.
- [ ] Revisar enlaces rotos, consola, formularios y navegación por teclado.
- [ ] Ejecutar build, lint y tests que tenga el proyecto.
- [ ] Medir antes/después y registrar resultados reales.

**Salida:** actualización validada y preparada para despliegue.

### Etapa 5 — Publicación segura (P2)

- [ ] Realizar preview/staging y revisar capturas.
- [ ] Desplegar según el workflow actual, con mecanismo de rollback.
- [ ] Validar analytics/SEO solo si están configurados legítimamente.
- [ ] Actualizar perfiles con la URL real una vez publicado.
- [ ] Documentar cambios y pendientes.

**Salida:** sitio actualizado en producción, si se autoriza publicar.

---

## 13. Matriz de aceptación (Definition of Done)

El cambio **no está terminado** hasta que se verifiquen estos puntos:

### Identidad

- [ ] El logotipo usa **exactamente el monograma B.3 aprobado**.
- [ ] Ninguna variante antigua permanece visible o referenciada.
- [ ] Color, tipografía y eslogan corresponden al Brandbook.
- [ ] Los logos se ven correctamente en fondos claros y oscuros.
- [ ] Favicon coincidente con el monograma en escritorio y móvil.

### Contenido

- [ ] Marca y perfil personal están diferenciados sin contradicciones.
- [ ] Proyectos, tecnologías, resultados y enlaces son verdaderos y actualizados.
- [ ] CTAs y enlaces funcionan; no hay datos de contacto inventados.
- [ ] No existen placeholders públicos del tipo `[COMPLETAR]`, `#`, ni URLs de ejemplo.

### Experiencia

- [ ] Sin desbordamiento horizontal en 320/375/390/768/1024/1440 px.
- [ ] Navegación con teclado y menú móvil funcionales.
- [ ] Contraste, focus visible, alt e interacción accesibles.
- [ ] Formulario de contacto funcionando, o medio alternativo válido.

### Técnica

- [ ] Compilación, lint, typecheck y tests existentes pasan (cuando apliquen).
- [ ] Sin errores de consola ni peticiones 404 importantes.
- [ ] Metadatos y previews sociales usan el dominio real.
- [ ] Las principales métricas de rendimiento no empeoran sin explicación.
- [ ] No se expusieron secretos ni se rompió funcionalidad existente.
- [ ] El cambio está documentado y dispone de rollback.

---

## 14. Archivo de configuración de contenido sugerido

Centralizar datos que se repiten, usando el formato nativo del proyecto. Ejemplo conceptual:

```ts
export const siteConfig = {
  brand: 'CD STUDIO',
  descriptor: 'Software Design & Development',
  tagline: 'Software con precisión y visión.',
  heroDescription:
    'Diseño y desarrollo soluciones digitales modernas, funcionales y escalables.',
  // Usar únicamente URL, email y perfiles reales y verificados:
  websiteUrl: '',
  email: '',
  githubUrl: '',
  linkedinUrl: '',
};
```

No dejar enlaces vacíos renderizados como botones activos. La solución definitiva puede usar JSON, YAML, CMS, constantes o tipados del proyecto existente.

---

## 15. Prompt de ejecución para Codex u otro agente de desarrollo

Copiar este bloque en tu herramienta de programación **junto con acceso al repositorio existente y al Kit Maestro aprobado**:

> **Tarea:** Actualiza mi portafolio web existente para convertirlo en la presencia profesional de CD STUDIO. Sigue el documento `CD_STUDIO_Plan_Actualizacion_Portafolio.md` como especificación principal y el Kit Maestro v1.0 como fuente de identidad. **No crees un proyecto nuevo.**
>
> 1. Analiza el repositorio antes de editar: stack, carpetas, rutas, estilos, componentes, dependencias, contenido, SEO, responsive y proceso de build/deploy.
> 2. Presenta un diagnóstico breve y un plan de cambios por archivos; identifica riesgos. Conserva la arquitectura actual, rutas e información real.
> 3. Integra **exactamente** el SVG oficial del monograma B.3 corregido. No lo redibujes. Usa el nombre CD STUDIO, Space Grotesk + Inter, la paleta oficial y el eslogan «Software con precisión y visión.»
> 4. Refactoriza estilos y componentes existentes solo donde haga falta; mejora hero, navegación, proyectos, sobre mí, contacto, footer y estados responsive según la especificación.
> 5. Mantén un mensaje honesto: marca personal con visión de estudio futuro. No inventes clientes, testimonios, experiencia, resultados, URLs, certificados, empresa registrada ni tamaño de equipo.
> 6. Mejora accesibilidad, metadatos, rendimiento y seguridad según el stack actual. Verifica formularios y enlaces reales.
> 7. Ejecuta build, lint, typecheck y tests disponibles; corrige regresiones.
> 8. Devuélveme el resumen de archivos modificados, decisiones técnicas, capturas o comprobaciones visuales disponibles, pruebas realizadas y pendientes. No publiques en producción ni cambies dominio/servicios externos sin mi autorización.
>
> **Prioridad:** mantener funcionalidad existente, fidelidad absoluta al monograma B.3, coherencia visual, usabilidad y rendimiento. Si faltan datos personales o assets, marca el campo como pendiente en desarrollo; no inventes.

---

## 16. Fuentes de consulta técnica

- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/)
- [SEO Starter Guide — Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Core Web Vitals — web.dev](https://web.dev/articles/vitals)
- [Lighthouse — Chrome Developers](https://developer.chrome.com/docs/lighthouse/overview)

**Importante:** estas guías complementan la auditoría de tu código; no reemplazan las pruebas reales del sitio.

---

## 17. Información que debe completarse con datos reales

| Dato | Estado |
|---|---|
| URL del portafolio actual | `[PENDIENTE]` |
| Enlace al repositorio | `[PENDIENTE]` |
| Stack y método de despliegue | `[PENDIENTE]` |
| Nombre profesional a mostrar | `[PENDIENTE]` |
| Correo de contacto | `[PENDIENTE]` |
| LinkedIn | `[PENDIENTE]` |
| GitHub | `[PENDIENTE]` |
| Proyectos y demos verificados | `[PENDIENTE]` |
| CV actualizado | `[PENDIENTE]` |
| Ubicación del SVG B.3 maestro | `[PENDIENTE]` |

**Regla final:** si hay diferencias entre este documento y la geometría del logo, **manda el Kit Maestro aprobado**. Si hay diferencias entre un texto de ejemplo y la realidad profesional, **manda la información real**.

---

**CD STUDIO**  
*Software Design & Development*  
**Software con precisión y visión.**
