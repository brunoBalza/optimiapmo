# OPTIMIA PMO | Plataforma Web & Simulador de ROI Financiero

> **Gerenciamiento Eficiente de Proyectos Inmobiliarios & Ingeniería de Procesos**  
> *Maximización del ROI y Previsibilidad Operativa en Obra mediante Control Matemático, Modelado BIM 5D e Indicadores Earned Value Management (EVM).*

![Version](https://img.shields.io/badge/version-1.0.0-41495E?style=for-the-badge&logo=github)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20ES6%2B%20%7C%20TailwindCSS%20%7C%20Chart.js-C3582B?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-3F6352?style=for-the-badge)
![Location](https://img.shields.io/badge/HQ-Mendoza%2C%20Argentina-EEBC21?style=for-the-badge)

---

## 🏛️ Descripción Corporativa

**OPTIMIA PMO** es una firma especializada en gerenciamiento integral de proyectos inmobiliarios, auditoría de sobrecostos e ingeniería de procesos de alta complejidad. La plataforma web corporativa combina una arquitectura frontend moderna y modular con un **Motor de Cálculo Financiero y Simulador de ROI** interactivo en tiempo real, diseñado para demostrar numéricamente el impacto de la gestión matemática frente a la improvisación tradicional en obra.

---

## 📁 Arquitectura del Repositorio

El proyecto implementa una arquitectura modular profesional basada en **ES Modules (ESM)** y **Tailwind CSS**, lista para entornos de desarrollo local y bundlers de producción como **Vite**.

```
Optimia/
├── package.json                # Manifiesto de dependencias, scripts de build y versión
├── vite.config.js              # Configuración de empaquetado Vite y servidor dev
├── README.md                   # Documentación ejecutiva del repositorio
├── index.html                  # Plantilla HTML5 semántica y punto de entrada principal
├── public/                     # Recursos estáticos de distribución pública
│   └── favicon.svg             # Isotipo de marca vectorial en SVG
└── src/
    ├── styles/
    │   ├── main.css            # Clases base, componentes y estilización de controles
    │   └── blueprint.css       # Tramas de fondo y cuadrículas técnicas de ingeniería
    └── scripts/
        ├── main.js             # Orquestador y punto de entrada ES Module
        ├── config.js           # Constantes globales, colores y escalas de honorarios
        ├── simulator.js        # Motor matemático de cálculo de ROI y métricas financieras
        ├── charts.js           # Controlador encapsulado de Chart.js (Curva S y EVM)
        ├── navigation.js       # Menú responsive y drawer de navegación móvil
        ├── tabs.js             # Controlador de pestañas de propuesta de valor
        └── form.js             # Manejador de formulario corporativo de contacto
```

---

## 🎨 Sistema de Diseño (Design Tokens)

El diseño visual transmite rigor matemático, precisión de ingeniería y sobriedad financiera corporativa:

| Token de Color | Valor HEX | Aplicación en Interfaz |
| :--- | :--- | :--- |
| **Slate Grey** | `#41495E` | Encabezados principales, barras de navegación y acentos estructurales. |
| **Charcoal Grey** | `#2A3A3F` | Cuerpo de lectura y tipografía secundaria de alta legibilidad. |
| **Terracotta** | `#C3582B` | Llamadas a la acción (CTA), desvíos financieros y sliders de riesgo. |
| **Emerald Green** | `#3F6352` | Indicadores de ahorro mitigado, métricas óptimas y avance CPI/SPI. |
| **Cement Grey** | `#A5A692` | Rejillas de fondo (Grid Pattern) y líneas guía de planos técnicos. |
| **Mint Turquoise**| `#41BFB3` | Modelado BIM 5D, detección de interferencias y badges tecnológicos. |
| **Amber Yellow** | `#EEBC21` | Retorno de inversión (ROI), hitos clave y componentes destacados. |

---

## 🧮 Lógica de Negocio y Fórmulas del Simulador

El motor de simulación en `src/scripts/simulator.js` calcula de forma reactiva en tiempo real las siguientes métricas financieras:

### 1. Pérdida Tradicional Estimada
Calcula el sobreprecio estimado por falta de control PMO:
$$\text{Pérdida Tradicional} = \text{Presupuesto (B)} \times \left( \frac{\text{Desvío (\%) (V)}}{100} \right)$$

### 2. Ahorro Mitigado con OPTIMIA
Se asume una capacidad de mitigación de riesgo del **90%** sobre la pérdida tradicional estimada:
$$\text{Ahorro Mitigado} = \text{Pérdida Tradicional} \times 0.90$$

### 3. Escala Variable de Honorarios PMO
Determinación transparente de honorarios según la escala del proyecto:
- **Presupuesto > $2,000,000 USD:** $1.5\%$ sobre el presupuesto total.
- **$500,000 USD $\le$ Presupuesto $\le$ $2,000,000 USD:** $2.0\%$ sobre el presupuesto total.
- **Presupuesto < $500,000 USD:** $2.5\%$ sobre el presupuesto total.

$$\text{Honorarios PMO} = \text{Presupuesto} \times \text{Tarifa Percentil}$$

### 4. Multiplicador de Retorno de Inversión (Factor ROI)
Expresa la relación entre el ahorro directo logrado y el honorario de la PMO:
$$\text{Factor ROI} = \frac{\text{Ahorro Mitigado}}{\text{Honorarios PMO}}$$

---

## 📊 Gráficos Analíticos Integrados

1. **Curva S de Avance Físico de Obra (`src/scripts/charts.js`):**
   - Muestra la Línea Base planificada frente al Avance Real Óptimo (OPTIMIA PMO).
   - Ajusta dinámicamente el eje horizontal ($M_1$ a $M_{18}$) estirando la curva de la gestión tradicional según el porcentaje de desvío del slider.

2. **Indicadores Earned Value Management (EVM):**
   - **Cost Performance Index (CPI):** $\text{CPI} = \frac{1}{1 + (\text{Desvío} / 100)}$
   - **Schedule Performance Index (SPI):** $\text{SPI} = \frac{1}{1 + (\text{Desvío} \times 0.8 / 100)}$
   - Compara las barras de eficiencia tradicional en color Terracota frente a la estabilidad de OPTIMIA (CPI: 0.99 / SPI: 1.01).

---

## 🚀 Instalación y Despliegue Local

### Requisitos Previos
- **Node.js** (v18.0.0 o superior)
- **NPM** (v9.0.0 o superior)

### Pasos de Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/optimia-pmo.git
   cd optimia-pmo
   ```

2. **Instalar dependencias de desarrollo:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible en `http://localhost:3000` con Hot Module Replacement (HMR).*

4. **Compilar para producción (Build):**
   ```bash
   npm run build
   ```
   *Genera los archivos optimizados y minificados en el directorio `dist/`.*

5. **Previsualizar bundle de producción:**
   ```bash
   npm run preview
   ```

---

## 📬 Contacto Institucional & Dirección Técnica

- **Director de PMO & Process Engineering:** Arq. Adrián Manrique
- **Ubicación:** Mendoza, Argentina (Cobertura Regional e Internacional)
- **Correo Electrónico:** [arq.adrianmanrique@gmail.com](mailto:arq.adrianmanrique@gmail.com)
- **Especialidades:** Gerenciamiento PMO Integral, Auditoría de Sobrecostos, BIM 5D, Dashboards EVM.

---

## 📄 Licencia

© 2026 **OPTIMIA PMO**. Todos los derechos reservados. Este código fuente y sus activos asociados son propiedad intelectual confidencial y privada.
