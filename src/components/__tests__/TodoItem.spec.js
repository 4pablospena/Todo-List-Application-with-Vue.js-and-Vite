import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'

const createTodo = (overrides = {}) => ({
  id: 1,
  text: 'Test todo',
  completed: false,
  ...overrides,
})

describe('TodoItem.vue', () => {
  it('renders todo text', () => {
    const todo = createTodo()
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    expect(wrapper.text()).toContain(todo.text)
  })

  it('applies completed styling when todo is completed', () => {
    const todo = createTodo({ completed: true })
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    const textEl = wrapper.find('.todo-item__text')
    expect(textEl.classes()).toContain('todo-item__text--completed')
  })

  it('emits toggle when checkbox is changed', async () => {
    const todo = createTodo()
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.trigger('change')

    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('emits delete when delete button is clicked', async () => {
    const todo = createTodo()
    const wrapper = mount(TodoItem, {
      props: { todo },
    })

    const button = wrapper.find('button.todo-item__delete')
    await button.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
  })
})

