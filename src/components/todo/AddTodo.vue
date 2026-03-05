<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['add-todo'])

const text = ref('')

const trimmedText = computed(() => text.value.trim())
const isDisabled = computed(() => !trimmedText.value)

const handleSubmit = () => {
  if (isDisabled.value) return

  emit('add-todo', trimmedText.value)
  text.value = ''
}
</script>

<template>
  <form class="add-todo" @submit.prevent="handleSubmit">
    <label class="add-todo__label" for="new-todo">Add a new task</label>
    <div class="add-todo__controls">
      <input
        id="new-todo"
        v-model="text"
        class="add-todo__input"
        type="text"
        name="todo"
        placeholder="What do you need to get done?"
        autocomplete="off"
      />
      <button class="add-todo__button" type="submit" :disabled="isDisabled">
        Add
      </button>
    </div>
  </form>
</template>

<style scoped>
.add-todo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.add-todo__label {
  font-size: 0.9rem;
  color: #6b7280;
}

.add-todo__controls {
  display: flex;
  gap: 0.75rem;
}

.add-todo__input {
  flex: 1;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

.add-todo__input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.add-todo__button {
  padding: 0.6rem 1.1rem;
  border-radius: 0.5rem;
  border: none;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  white-space: nowrap;
  transition:
    transform 120ms ease-out,
    box-shadow 120ms ease-out,
    opacity 120ms ease-out;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.35);
}

.add-todo__button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 26px rgba(79, 70, 229, 0.4);
}

.add-todo__button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.35);
}

.add-todo__button:disabled {
  opacity: 0.6;
  cursor: default;
  box-shadow: none;
}

@media (max-width: 640px) {
  .add-todo__controls {
    flex-direction: column;
  }

  .add-todo__button {
    width: 100%;
    text-align: center;
  }
}
</style>
