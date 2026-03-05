## Todo List Application – Vue 3 + Vite

Aplicación de lista de tareas construida con **Vue 3 (Composition API)** y **Vite**.  
Este proyecto está pensado como ejercicio práctico para demostrar:

- Composición de componentes en Vue 3.
- Gestión de estado con composables.
- Buenas prácticas de UI (responsiva, estados vacíos, feedback visual).
- Testing con **Vitest** y **Vue Test Utils** con métricas de cobertura.

---

## Objetivo del proyecto

Crear una **aplicación de Todo list completa** donde el usuario pueda:

- Añadir nuevas tareas.
- Marcar tareas como completadas / no completadas.
- Eliminar tareas.
- Ver un contador de:
  - Total de tareas.
  - Tareas completadas.
- Ver un mensaje de estado vacío cuando no hay tareas.
- Mantener las tareas **persistidas en el navegador** usando `localStorage`, incluso tras recargar la página.

Además, el proyecto incluye **tests unitarios y de componentes** con al menos un **80% de cobertura**.

---

## Stack técnico

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Bundler / Dev server:** Vite
- **Lenguaje:** JavaScript (ESM)
- **Testing:**
  - Vitest
  - Vue Test Utils
  - jsdom

---

## Estructura principal del proyecto

Archivos y carpetas más relevantes:

- `src/main.js`  
  Punto de entrada de la app. Crea la aplicación Vue, importa los estilos globales y monta `App.vue`.

- `src/App.vue`  
  Componente raíz. Define la maquetación general (título, tarjeta principal) y compone:
  - `AddTodo` (formulario para añadir tareas).
  - `TodoList` (listado de tareas + contadores).
  Se conecta al estado proporcionado por el composable `useTodos`.

- `src/composables/useTodos.js`  
  Composable que encapsula toda la **lógica de negocio de las tareas**:
  - Estado reactivo: `todos` (array de `{ id, text, completed }`).
  - Acciones:
    - `addTodo(text)`
    - `toggleTodo(id)`
    - `deleteTodo(id)`
  - Derivados (`computed`):
    - `totalCount`
    - `completedCount`
  - Persistencia en `localStorage`:
    - Carga inicial desde `localStorage` si existen datos.
    - Guarda automáticamente cada cambio de `todos`.

- `src/components/todo/AddTodo.vue`  
  Formulario controlado para añadir tareas:
  - Input de texto con `v-model`.
  - Botón “Add” deshabilitado si el texto está vacío o solo tiene espacios.
  - Emite `add-todo` con el texto ya recortado al enviar el formulario.

- `src/components/todo/TodoItem.vue`  
  Representa una tarea individual:
  - Checkbox para marcar como completada.
  - Texto de la tarea con **strikethrough** y color atenuado cuando está completada.
  - Botón para eliminar la tarea.
  - Prop `todo` con validador para `{ id, text, completed }`.
  - Eventos:
    - `toggle`
    - `delete`

- `src/components/todo/TodoList.vue`  
  Lista de tareas:
  - Recibe por `props`:
    - `todos`
    - `totalCount`
    - `completedCount`
  - Muestra:
    - Cabecera con título “Your tasks”.
    - Componente `TodoStats` con “Total” y “Completed”.
    - Mensaje de estado vacío cuando `todos` está vacío.
    - Lista de `TodoItem` cuando hay tareas.
  - Reemite eventos:
    - `toggle-todo`
    - `delete-todo`

- `src/components/todo/TodoStats.vue`  
  Contadores de estado:
  - Props: `totalCount`, `completedCount`.
  - Muestra chips "Total" y "Completed".

- `src/styles/base.css`  
  Estilos globales:
  - Reset básico (`box-sizing`, márgenes).
  - Fondo con gradiente suave.
  - Contenedor centrado y responsive.

- `src/tests/setupTests.js`  
  Configuración global de pruebas:
  - Mock de `localStorage` para que los tests funcionen sin navegador real.

- `vite.config.js`  
  Configuración de Vite y Vitest:
  - Plugin de Vue.
  - Entorno de test `jsdom`.
  - Fichero de setup de tests.
  - Configuración de cobertura con umbrales ≥ 80%.

---

## Cómo ejecutar la aplicación

### Requisitos previos

- Node.js (versión moderna LTS recomendada, p. ej. 18+).
- npm (incluido con Node).

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar el servidor de desarrollo

```bash
npm run dev
```

Luego abre en el navegador la URL que te indique Vite (normalmente `http://localhost:5173`).

Con el servidor levantado podrás:

- Añadir tareas desde el formulario.
- Marcar tareas como completadas / no completadas.
- Eliminar tareas.
- Ver contadores y estados vacíos.
- Recargar la página y comprobar que las tareas se mantienen gracias a `localStorage`.

---

## Scripts de npm disponibles

En `package.json` tienes definidos los siguientes scripts:

- **Desarrollo**

  ```bash
  npm run dev
  ```

- **Build de producción**

  ```bash
  npm run build
  ```

- **Preview del build**

  ```bash
  npm run preview
  ```

- **Tests**

  ```bash
  npm test
  # o
  npm run test
  ```

- **Tests en watch mode**

  ```bash
  npm run test:watch
  ```

- **Tests con cobertura**

  ```bash
  npm run test:coverage
  ```

---

## Testing y cobertura

Las pruebas están implementadas con **Vitest** y **Vue Test Utils**, cubriendo:

- `useTodos` (composable):
  - Añadir tareas (`addTodo`).
  - Ignorar entradas vacías o solo espacios.
  - Marcar tareas como completadas / no completadas (`toggleTodo`).
  - Eliminar tareas (`deleteTodo`).
  - Carga inicial desde `localStorage`.
  - Persistencia automática en `localStorage` cuando cambian las tareas.

- `AddTodo.vue`:
  - Renderizado de input y botón.
  - Emisión de evento con texto recortado al enviar.
  - No emitir evento si el input está vacío o solo tiene espacios.

- `TodoItem.vue`:
  - Renderizado del texto.
  - Estilos de completado aplicados correctamente.
  - Emisión de eventos `toggle` y `delete`.

- `TodoStats.vue`:
  - Renderizado de contadores Total y Completed.

- `TodoList.vue`:
  - Estado vacío cuando no hay tareas.
  - Renderizado de múltiples `TodoItem`.
  - Contadores de total y completadas.
  - Reemisión de eventos hacia el componente padre.

La cobertura se puede consultar con:

```bash
npm run test:coverage
```

Los umbrales configurados en `vite.config.js` son:

- `lines`: 80
- `functions`: 80
- `branches`: 80
- `statements`: 80

La cobertura real actual supera estos mínimos.

---

## Posibles extensiones futuras

Algunas mejoras que se podrían añadir sobre esta base:

- Filtros por estado: **All / Active / Completed**.
- Búsqueda de tareas por texto.
- Edición inline del texto de una tarea.
- Internacionalización (i18n) para soportar varios idiomas.
- Persistencia en backend (API REST, Firebase, etc.) en lugar de solo `localStorage`.
