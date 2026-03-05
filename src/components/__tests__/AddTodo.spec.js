import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddTodo from '../AddTodo.vue'

describe('AddTodo.vue', () => {
  it('renders input and button', () => {
    const wrapper = mount(AddTodo)

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('emits add-todo with trimmed text and clears input on submit', async () => {
    const wrapper = mount(AddTodo)
    const input = wrapper.find('input[type="text"]')

    await input.setValue('  New task  ')
    await wrapper.find('form').trigger('submit.prevent')

    const events = wrapper.emitted('add-todo')
    expect(events).toBeTruthy()
    expect(events[0]).toEqual(['New task'])
    expect(input.element.value).toBe('')
  })

  it('does not emit add-todo when input is empty or whitespace', async () => {
    const wrapper = mount(AddTodo)
    const input = wrapper.find('input[type="text"]')

    await input.setValue('   ')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-todo')).toBeUndefined()
  })
})

