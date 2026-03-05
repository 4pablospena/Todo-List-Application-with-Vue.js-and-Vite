import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { useTodos } from '../useTodos'

const STORAGE_KEY = 'vue-todos'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('useTodos composable', () => {
  it('adds a todo with trimmed text and default completed state', () => {
    const { todos, totalCount, completedCount, addTodo } = useTodos()

    addTodo('  Learn Vue 3  ')

    expect(todos.value).toHaveLength(1)
    expect(todos.value[0]).toMatchObject({
      text: 'Learn Vue 3',
      completed: false,
    })
    expect(totalCount.value).toBe(1)
    expect(completedCount.value).toBe(0)
  })

  it('ignores empty or whitespace-only todos', () => {
    const { todos, addTodo } = useTodos()

    addTodo('')
    addTodo('   ')
    addTodo('   \n  ')

    expect(todos.value).toHaveLength(0)
  })

  it('toggles completion state for a todo by id', () => {
    const { todos, completedCount, addTodo, toggleTodo } = useTodos()

    addTodo('Task 1')
    addTodo('Task 2')
    const [first, second] = todos.value

    toggleTodo(first.id)

    expect(first.completed).toBe(true)
    expect(second.completed).toBe(false)
    expect(completedCount.value).toBe(1)

    toggleTodo(first.id)
    expect(first.completed).toBe(false)
    expect(completedCount.value).toBe(0)
  })

  it('deletes a todo by id and updates counts', () => {
    const { todos, totalCount, addTodo, deleteTodo } = useTodos()

    addTodo('Task 1')
    addTodo('Task 2')
    const [first, second] = todos.value

    expect(totalCount.value).toBe(2)

    deleteTodo(first.id)
    expect(todos.value).toHaveLength(1)
    expect(todos.value[0].id).toBe(second.id)
    expect(totalCount.value).toBe(1)
  })

  it('initializes todos from localStorage when stored data exists', () => {
    const storedTodos = [
      { id: 5, text: 'From storage', completed: false },
      { id: 10, text: 'Also from storage', completed: true },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedTodos))

    const { todos, addTodo } = useTodos()

    expect(todos.value).toEqual(storedTodos)

    addTodo('New task')

    const newIds = todos.value.map((t) => t.id)
    const maxStoredId = storedTodos.reduce(
      (max, t) => (t.id > max ? t.id : max),
      0,
    )

    expect(Math.max(...newIds)).toBeGreaterThan(maxStoredId)
  })

  it('persists todos to localStorage whenever they change', async () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()

    addTodo('Persist me')
    await nextTick()

    let saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    expect(saved).toEqual(todos.value)

    const firstId = todos.value[0].id
    toggleTodo(firstId)
    await nextTick()

    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const savedFirst = saved.find((t) => t.id === firstId)
    expect(savedFirst?.completed).toBe(true)

    deleteTodo(firstId)
    await nextTick()

    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    expect(saved).toHaveLength(0)
  })
})

