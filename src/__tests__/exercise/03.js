// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  const user = userEvent.setup()
  render(<Counter />)
  const [decrement, increment] = screen.getAllByRole('button')
  const message = screen.getByText('Current count: 0')

  expect(message).toHaveTextContent('Current count: 0')
  await user.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await user.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
