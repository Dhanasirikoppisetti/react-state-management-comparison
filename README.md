# The Bunny Treats – React State Management Comparison

A comprehensive comparison of modern React state management solutions through the implementation of a bakery-themed e-commerce shopping cart application. This project evaluates React Context API, Zustand, and Redux Toolkit by measuring rendering performance, bundle size impact, code complexity, and developer experience.

---

## Project Overview

State management is a critical aspect of modern frontend development. As applications grow, managing shared data efficiently becomes increasingly important for maintainability and performance.

This project implements the same shopping cart application using three different state management approaches:

* React Context API
* Zustand
* Redux Toolkit

The objective is to analyze how each solution handles state updates, component re-rendering, scalability, and development workflow while maintaining identical application functionality.

---

## Objectives

* Build a shopping cart application using three different state management approaches.
* Compare rendering performance and re-render behavior.
* Measure bundle size impact of each library.
* Evaluate implementation complexity and developer experience.
* Identify suitable use cases for each state management solution.
* Gain practical experience with performance profiling and optimization techniques.

---

## Application Features

The application includes the following functionality:

* Product catalog display
* Add to cart functionality
* Cart sidebar management
* Quantity updates
* Cart total calculations
* User information management
* Theme switching
* Render count monitoring for performance analysis

---

## Project Structure

```text
react-state-management-comparison/
│
├── context-version/
├── zustand-version/
├── redux-version/
│
├── profiling/
├── bundle-analysis/
│
├── RESULTS.md
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── .env.example
```

### Implementation Overview

#### Context API Version

* Single Provider (Naive Implementation)
* Split Provider (Optimized Implementation)
* useReducer-based state management
* Demonstrates Context re-render behavior and optimization strategies

#### Zustand Version

* Centralized store architecture
* Selector-based subscriptions
* Minimal boilerplate
* Optimized rendering performance

#### Redux Toolkit Version

* configureStore setup
* createSlice architecture
* useSelector and useDispatch hooks
* Structured and scalable state management approach

---

## Technology Stack

### Frontend

* React
* Vite
* JavaScript (ES6+)
* CSS3

### State Management

* React Context API
* Zustand
* Redux Toolkit
* React Redux

### Performance Analysis

* React DevTools Profiler
* Bundle Analysis Tools

### Deployment & Containerization

* Docker
* Docker Compose
* Nginx

---

## Running the Project

### Context API Version

```bash
cd context-version
npm install
npm run dev
```

### Zustand Version

```bash
cd zustand-version
npm install
npm run dev
```

### Redux Toolkit Version

```bash
cd redux-version
npm install
npm run dev
```

---

## Docker Setup

Build and run the production environment:

```bash
docker-compose up --build -d
```

Verify service status:

```bash
docker-compose ps
```

The application will be available at:

```text
http://localhost:8080
```

---

## Performance Evaluation

The following metrics are used for comparison:

* Component re-render counts
* Bundle size impact
* State management boilerplate
* Number of setup files
* Development complexity
* Debugging capabilities

Performance analysis is performed using React DevTools Profiler and bundle analysis tools.

---

## Benchmark Summary

| Metric                | Context API (Naive) | Context API (Optimized) | Zustand   | Redux Toolkit |
| --------------------- | ------------------- | ----------------------- | --------- | ------------- |
| Re-render Performance | High Re-renders     | Improved                | Optimized | Optimized     |
| Bundle Size Impact    | None                | None                    | Small     | Moderate      |
| Boilerplate           | Low                 | Medium                  | Low       | Medium        |
| Learning Curve        | Low                 | Low-Medium              | Low       | Medium        |
| Scalability           | Moderate            | Good                    | Good      | Excellent     |
| Debugging Support     | Basic               | Basic                   | Good      | Excellent     |

Detailed benchmark results, profiler screenshots, and bundle analysis reports are available in the `RESULTS.md` file.

---

## Key Learnings

* React Context API is suitable for small to medium applications when properly structured.
* Context splitting significantly reduces unnecessary re-renders.
* Zustand provides an excellent balance between simplicity and performance.
* Redux Toolkit offers a highly scalable architecture with powerful debugging capabilities.
* Performance optimization requires careful control of component subscriptions and state updates.

---

## Conclusion

This project provides a practical comparison of three popular React state management solutions by implementing and benchmarking the same application architecture across multiple approaches. The findings help developers make informed decisions when selecting a state management strategy based on application size, complexity, performance requirements, and team needs.
