import { ref, computed } from 'vue'

export function useTodos() {
  const todos = ref([])
  let nextId = 1

  const addTodo = (text) => {
    const trimmed = typeof text === 'string' ? text.trim() : ''
    if (!trimmed) return

    todos.value.push({
      id: nextId++,
      text: trimmed,
      completed: false,
    })
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find((item) => item.id === id)
    if (!todo) return
    todo.completed = !todo.completed
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter((item) => item.id !== id)
  }

  const totalCount = computed(() => todos.value.length)

  const completedCount = computed(
    () => todos.value.filter((item) => item.completed).length,
  )

  return {
    todos,
    totalCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}

