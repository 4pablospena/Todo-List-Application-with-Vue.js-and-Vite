<script setup>
import AddTodo from './components/AddTodo.vue'
import TodoList from './components/TodoList.vue'
import { useTodos } from './composables/useTodos'

const { todos, totalCount, completedCount, addTodo, toggleTodo, deleteTodo } = useTodos()

const handleAddTodo = (text) => {
  addTodo(text)
}
</script>

<template>
  <main class="app">
    <section class="app__header">
      <h1 class="app__title">Vue Todo List</h1>
      <p class="app__subtitle">Add tasks, mark them complete, and stay organized.</p>
    </section>

    <section class="app__card">
      <AddTodo @add-todo="handleAddTodo" />

      <TodoList
        :todos="todos"
        :total-count="totalCount"
        :completed-count="completedCount"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
      />
    </section>
  </main>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.app__header {
  text-align: center;
}

.app__title {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.6rem);
}

.app__subtitle {
  margin-top: 0.25rem;
  margin-bottom: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.app__card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .app__card {
    padding: 1.25rem;
  }
}
</style>
