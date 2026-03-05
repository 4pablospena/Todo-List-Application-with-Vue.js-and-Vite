import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../todo/TodoList.vue'
import TodoItem from '../todo/TodoItem.vue'

const createTodos = () => [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
]

describe('TodoList.vue', () => {
  it('shows empty state when there are no todos', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: [],
        totalCount: 0,
        completedCount: 0,
      },
    })

    expect(wrapper.text()).toContain('No todos yet')
    expect(wrapper.findAllComponents(TodoItem)).toHaveLength(0)
  })

  it('renders a TodoItem for each todo', () => {
    const todos = createTodos()
    const wrapper = mount(TodoList, {
      props: {
        todos,
        totalCount: todos.length,
        completedCount: todos.filter((t) => t.completed).length,
      },
    })

    const items = wrapper.findAllComponents(TodoItem)
    expect(items).toHaveLength(todos.length)
  })

  it('displays correct total and completed counters', () => {
    const todos = createTodos()
    const totalCount = todos.length
    const completedCount = todos.filter((t) => t.completed).length

    const wrapper = mount(TodoList, {
      props: {
        todos,
        totalCount,
        completedCount,
      },
    })

    expect(wrapper.text()).toContain(`Total: ${totalCount}`)
    expect(wrapper.text()).toContain(`Completed: ${completedCount}`)
  })

  it('forwards toggle and delete events from TodoItem with the correct id', async () => {
    const todos = createTodos()
    const wrapper = mount(TodoList, {
      props: {
        todos,
        totalCount: todos.length,
        completedCount: todos.filter((t) => t.completed).length,
      },
    })

    const firstItem = wrapper.findAllComponents(TodoItem)[0]
    await firstItem.vm.$emit('toggle')
    await firstItem.vm.$emit('delete')

    const toggleEvents = wrapper.emitted('toggle-todo')
    const deleteEvents = wrapper.emitted('delete-todo')

    expect(toggleEvents?.[0]).toEqual([todos[0].id])
    expect(deleteEvents?.[0]).toEqual([todos[0].id])
  })
})

