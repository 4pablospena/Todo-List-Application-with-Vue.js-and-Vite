<script setup>
defineProps({
  totalCount: {
    type: Number,
    required: true,
  },
  completedCount: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="todo-stats">
    <span class="todo-stats__stat">Total: {{ totalCount }}</span>
    <span class="todo-stats__stat todo-stats__stat--completed">
      Completed: {{ completedCount }}
    </span>
  </div>
</template>

<style scoped>
.todo-stats {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.todo-stats__stat {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background-color: #f3f4f6;
  color: #374151;
}

.todo-stats__stat--completed {
  background-color: #ecfdf5;
  color: #047857;
}
</style>
