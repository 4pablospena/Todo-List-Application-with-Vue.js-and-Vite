<script setup>
import TodoItem from './TodoItem.vue'
import TodoStats from './TodoStats.vue'

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
      <TodoStats :total-count="totalCount" :completed-count="completedCount" />
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
