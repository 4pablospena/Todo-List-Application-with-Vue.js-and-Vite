<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true,
    validator: (t) =>
      typeof t?.id === 'number' &&
      typeof t?.text === 'string' &&
      typeof t?.completed === 'boolean',
  },
})

const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
  <li class="todo-item">
    <label class="todo-item__content">
      <input
        class="todo-item__checkbox"
        type="checkbox"
        :checked="props.todo.completed"
        @change="emit('toggle')"
      />
      <span class="todo-item__text" :class="{ 'todo-item__text--completed': props.todo.completed }">
        {{ props.todo.text }}
      </span>
    </label>

    <button
      class="todo-item__delete"
      type="button"
      aria-label="Delete todo"
      @click="emit('delete')"
    >
      ✕
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 0.4rem;
  border-bottom: 1px solid #e5e7eb;
}

.todo-item:last-of-type {
  border-bottom: none;
}

.todo-item__content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  cursor: pointer;
}

.todo-item__checkbox {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.todo-item__text {
  font-size: 0.95rem;
  color: #111827;
  word-break: break-word;
}

.todo-item__text--completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-item__delete {
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 999px;
  transition:
    background-color 120ms ease-out,
    color 120ms ease-out,
    transform 120ms ease-out;
}

.todo-item__delete:hover {
  background-color: #fee2e2;
  color: #b91c1c;
  transform: translateY(-0.5px);
}

.todo-item__delete:active {
  transform: translateY(0);
}
</style>
