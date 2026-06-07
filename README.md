# The Bunny Treats — React State Management Comparison 🐰🍰

A comprehensive benchmark comparison of three React state management libraries (React Context API, Zustand, and Redux Toolkit) built as a cute, premium, pastel-themed bakery e-commerce shopping website.

---

## 🌟 Objective

The goal of this project is to benchmark and analyze the developer experience, rendering performance, bundle size, and boilerplate overhead of three state management approaches:
1. **React Context API** (both naive single-provider and optimized split-provider versions)
2. **Zustand** (with selector-based subscriptions)
3. **Redux Toolkit** (with granular slices and time-travel debugging)

---

## 🐰 Brand & UI Theme

To make the benchmarks visually engaging, the entire application has been styled with a cute, cozy bakery theme called **"The Bunny Treats"**:
* **Color Palette**: Warm Creams (`#FFF8F0`), Soft Pink (`#F8D7DA`), Light Brown (`#C89F94`), and Chocolate Brown (`#8B5E3C`).
* **Branding**: Bunny chef logo (`logo.png`) adjacent to cursive brand typography using the `Pacifico` font.
* **Tagline**: `"Freshly Baked Happiness 🍰"`.
* **INR Localized Pricing**: All product prices are localized in Indian Rupees (₹).
* **Card Proportions**: Images occupy the top half of the cards edge-to-edge with `object-fit: cover` and hover scale effects.
* **Terminology**: Standard "Cart" is updated to "Bunny Basket", and "Cart Summary" is updated to "Order Summary".

---

## 📁 Repository Structure

```
/react-state-management-comparison
├── /context-version         ← React Context API (naive + optimized)
├── /zustand-version         ← Zustand with selector subscriptions
├── /redux-version           ← Redux Toolkit with slices
├── /profiling               ← Profiler flame graph screenshots (4 files)
├── /bundle-analysis         ← Bundle treemap screenshots (2 files)
├── Dockerfile               ← Multi-stage build (Node → Nginx)
├── docker-compose.yml       ← Service with healthcheck on /health
├── nginx.conf               ← SPA routing + gzip + /health endpoint
├── .env.example             ← All environment variables documented
└── RESULTS.md               ← Benchmark table + Decision Guide
```

---

## 🚀 How to Run Each Version

Ensure you have [Node.js (v18+)](https://nodejs.org/) installed.

### 1. React Context Version
```bash
cd context-version
npm install
npm run dev
```
* **Optimized vs Naive Mode**: Open [config.js](file:///c:/Users/dhana/react-state-management-comparison/context-version/src/store/config.js) and toggle `CONTEXT_MODE` between `'naive'` and `'optimized'` to instantly compare re-rendering characteristics.

### 2. Zustand Version
```bash
cd zustand-version
npm install
npm run dev
```

### 3. Redux Toolkit Version
```bash
cd redux-version
npm install
npm run dev
```

---

## 🐳 Running with Docker

You can build and serve the production-ready Redux Toolkit version via Docker:

```bash
# Build and start the service
docker-compose up --build -d

# Verify health status
docker-compose ps
```
Once running, the app is served on **http://localhost:8080**.

---

## 📊 Summary of Key Findings

Detailed benchmark data, profiler flame graphs, and bundle treemaps can be found in [RESULTS.md](file:///c:/Users/dhana/react-state-management-comparison/RESULTS.md). 

| Metric | Context (naive) | Context (split) | Zustand | Redux Toolkit |
|---|---|---|---|---|
| **Re-renders on Add to Cart (10×)** | ~120+ (All cards + UI) | ~30 (Only Cart UI) | ~8 (Only subscribed) | ~8 (Only subscribed) |
| **Gzipped Library Size** | 0 KB | 0 KB | ~2.9 KB | ~12.5 KB |
| **Boilerplate LOC** | ~80 | ~120 | ~90 | ~150 |
| **Learning Curve** | Low | Low-Medium | Low | Medium-High |

### Key Recommendations
1. **Choose Context API** for small apps with infrequent state updates (e.g., locale, theme, auth credentials). Always split contexts by domain.
2. **Choose Zustand** for most modern dashboards, e-commerce, and mobile applications where high performance, minimal boilerplate, and fast developer velocity are crucial.
3. **Choose Redux Toolkit** for large-scale enterprise applications with massive dev teams, requiring strict structural conventions and advanced debugging tools like time-travel.

---

## 🛠️ Tech Stack & Tools
* **Core**: React, Vite
* **State Management**: React Context, Zustand, Redux Toolkit
* **Styling**: Custom CSS (Vanilla)
* **DevOps**: Docker, Nginx, Docker Compose
* **Profiling**: React DevTools Profiler, Vite Bundle Visualizer
