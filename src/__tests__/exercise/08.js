// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act} from 'react-test-renderer'

const setup = props => {
  const results = {}
  function TestComponent() {
    Object.assign(results, useCounter(props))
    return null
  }

  render(<TestComponent {...props} />)
  return results
}

test('exposes the count and increment/decrement functions', async () => {
  const result = setup()

  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customisation of initial count', async () => {
  const props = {initialCount: 2}
  const result = setup(props)

  expect(result.count).toBe(2)
  act(() => result.increment())
  expect(result.count).toBe(3)
  act(() => result.decrement())
  expect(result.count).toBe(2)
})

test('allows customisation of step', async () => {
  const props = {step: 2}
  const result = setup(props)

  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(2)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customisation of initialCount and step', async () => {
  const props = {initialCount: 3, step: 3}
  const result = setup(props)

  expect(result.count).toBe(3)
  act(() => result.increment())
  expect(result.count).toBe(6)
  act(() => result.decrement())
  expect(result.count).toBe(3)
})

/* eslint no-unused-vars:0 */
