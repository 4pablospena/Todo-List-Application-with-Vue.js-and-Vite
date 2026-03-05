import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'vue-todos'

export function useTodos() {
  const todos = ref([])

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        todos.value = parsed
      }
    } catch {
      todos.value = []
    }
  }

  const maxExistingId = todos.value.reduce(
    (max, todo) => (typeof todo.id === 'number' && todo.id > max ? todo.id : max),
    0,
  )
  let nextId = maxExistingId + 1

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

  watch(
    todos,
    (newValue) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    },
    { deep: true },
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

