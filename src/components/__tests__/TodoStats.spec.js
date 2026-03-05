import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoStats from '../todo/TodoStats.vue'

describe('TodoStats.vue', () => {
  it('displays total and completed counters correctly', () => {
    const wrapper = mount(TodoStats, {
      props: {
        totalCount: 5,
        completedCount: 2,
      },
    })

    expect(wrapper.text()).toContain('Total: 5')
    expect(wrapper.text()).toContain('Completed: 2')
  })

  it('displays zero when there are no todos', () => {
    const wrapper = mount(TodoStats, {
      props: {
        totalCount: 0,
        completedCount: 0,
      },
    })

    expect(wrapper.text()).toContain('Total: 0')
    expect(wrapper.text()).toContain('Completed: 0')
  })
})
