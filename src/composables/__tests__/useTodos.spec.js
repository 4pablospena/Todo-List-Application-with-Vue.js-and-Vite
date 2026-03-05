import { describe, it, expect } from 'vitest'
import { useTodos } from '../useTodos'

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
})

