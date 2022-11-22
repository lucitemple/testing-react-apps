// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'
// import {act} from 'react-test-renderer'

test('exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customisation of initial count', async () => {
  const props = {initialCount: 2}
  const {result} = renderHook(() => useCounter(props))

  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})

test('allows customisation of step', async () => {
  const props = {step: 2}
  const {result} = renderHook(() => useCounter(props))

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customisation of initialCount and step', async () => {
  const props = {initialCount: 3, step: 3}
  const {result} = renderHook(() => useCounter(props))

  expect(result.current.count).toBe(3)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('the step can be changed', async () => {
  const props = {step: 3}
  const {result, rerender} = renderHook(useCounter, {initialProps: props})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
