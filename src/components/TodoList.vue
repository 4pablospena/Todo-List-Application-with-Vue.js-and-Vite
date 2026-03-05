<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  completedCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['toggle-todo', 'delete-todo'])
</script>

<template>
  <section class="todo-list">
    <header class="todo-list__header">
      <h2 class="todo-list__title">Your tasks</h2>
      <div class="todo-list__stats">
        <span class="todo-list__stat">Total: {{ totalCount }}</span>
        <span class="todo-list__stat todo-list__stat--completed">
          Completed: {{ completedCount }}
        </span>
      </div>
    </header>

    <div v-if="!todos.length" class="todo-list__empty">
      <p>No todos yet. Add your first task above to get started.</p>
    </div>

    <ul v-else class="todo-list__items">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle-todo', todo.id)"
        @delete="emit('delete-todo', todo.id)"
      />
    </ul>
  </section>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todo-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.todo-list__title {
  margin: 0;
  font-size: 1.1rem;
}

.todo-list__stats {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.todo-list__stat {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background-color: #f3f4f6;
  color: #374151;
}

.todo-list__stat--completed {
  background-color: #ecfdf5;
  color: #047857;
}

.todo-list__empty {
  padding: 1.25rem 0.75rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.95rem;
  border-radius: 0.75rem;
  border: 1px dashed #e5e7eb;
  background-color: #f9fafb;
}

.todo-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 640px) {
  .todo-list__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

